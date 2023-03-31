import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import postData from '../../util/postData';
import setAuthorizationToken from '../../util/setAuthorizationToken';
import parseToken from '../../util/parseToken';
import { setAuth } from '../../reducers/authReducer';
import getData from '../../util/getData';
import { setProfile } from '../../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../reducers/cartReducer';

function GoogleButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mealboxes } = useSelector((state) => state.cartReducer.cart) || {
    mealboxes: [],
  };
  const { admin } = useSelector((state) => state.authReducer);

  const login = async (token) => {
    if (!localStorage.getItem('accessToken')) {
      localStorage.setItem('accessToken', token);
      setAuthorizationToken(token);
      await Auth();
      !admin && (await addItemsToAccountCart());
      window.location.reload();
    } else if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken') !== token
    ) {
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', token);
      setAuthorizationToken(token);
      await Auth();
      !admin && (await addItemsToAccountCart());
      window.location.reload();
    }
  };

  const Auth = () => {
    return new Promise((resolve) => {
      const { principal, roles } = parseToken(
        localStorage.getItem('accessToken')
      );
      dispatch(
        setAuth({
          isLogin: true,
          accessToken: localStorage.getItem('accessToken'),
          user: principal,
          admin: roles.includes('ADMIN'),
        })
      );
      getData('/users').then((data) => {
        dispatch(setProfile({ imagePath: data.imagePath, name: data.name }));
      });
      resolve();
    });
  };

  const addItemsToAccountCart = async () => {
    let postReqData = mealboxes.reduce(
      (acc, cur) => {
        if (cur.name === 'custom') {
          let box = Object.assign({}, cur);
          let quantity = box.quantity;
          delete box.cartMealboxId;
          delete box.quantity;
          let mealbox = box;

          acc.customMealboxes.push({ mealbox, quantity });
        } else {
          acc.adminMadeMealboxes.push({
            mealboxId: cur.mealboxId,
            quantity: cur.quantity,
          });
        }
        return acc;
      },
      { adminMadeMealboxes: [], customMealboxes: [] }
    );

    await postData('/users/cart/all', postReqData);
    let data = await getData('/users/cart');
    dispatch(setCart(data.data));
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      postData('/users/oauth/exist', { email: userInfo.data.email }).then(
        (res) => {
          if (res.status === 200) {
            login(res.headers.authorization);
          } else if (res.status === 409) {
            alert('구글 Oauth로 가입된 회원이 아닙니다.');
          } else {
            navigate('/signup/oauth', {
              state: {
                oauthName: userInfo.data.given_name,
                oauthEmail: userInfo.data.email,
              },
            });
          }
        }
      );
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Button onClick={() => googleLogin()} className="buttonstyle shadow">
      <FcGoogle size={25} />
      <div>Sign in with Google</div>
    </Button>
  );
}

export default GoogleButton;

const Button = styled.button`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--white);

  > div {
    margin-left: 0.5rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.2rem;
    color: var(--signature);
  }
`;
