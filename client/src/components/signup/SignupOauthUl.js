import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { setAuth } from '../../reducers/authReducer';
import { setCart } from '../../reducers/cartReducer';
import { setProfile } from '../../reducers/userReducer';
import getData from '../../util/getData';
import parseToken from '../../util/parseToken';
import postData from '../../util/postData';
import setAuthorizationToken from '../../util/setAuthorizationToken';
import useValid from '../../util/useValid';
import GetTemplate from '../commons/GetTemplate';
import LoginButton from '../login/LoginButton';
import InputDiv from './InputDiv';

function SignupOauthUl() {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [validText, isValid, setValidText, setIsValid] = useValid(inputValue);
  const inputRef = useRef([]);
  const { name, email } = inputValue;
  const location = useLocation();
  const dispatch = useDispatch();
  const { mealboxes } = useSelector((state) => state.cartReducer.cart) || {
    mealboxes: [],
  };

  useEffect(() => {
    if (location.state) {
      setInputValue({
        ...inputValue,
        name: location.state.oauthName,
        email: location.state.oauthEmail,
      });
      setIsValid({ ...isValid, name: true });
    }
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const login = async (token) => {
    if (!localStorage.getItem('accessToken')) {
      localStorage.setItem('accessToken', token);
      setAuthorizationToken(token);
      await Auth();
      await addItemsToAccountCart();
      window.location.reload();
    } else if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken') !== token
    ) {
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', token);
      setAuthorizationToken(token);
      await Auth();
      await addItemsToAccountCart();
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

    await postData('/users/cart/all', postReqData); // 여기
    let data = await getData('/users/cart');
    setCart(data.data);
  };

  const handleClick = () => {
    let obj = {};
    for (const el in isValid) {
      if (!inputValue[el]) {
        obj = { ...obj, [el]: '필수 항목입니다.' };
      }
    }
    setValidText({ ...validText, ...obj });
    if (isValid.name) {
      postData('/users/oauth/signup', { name, email }).then((res) => {
        if (res.status === 200) {
          if (res.headers.authorization) {
            login(res.headers.authorization);
          }
        } else if (res.status === 400) {
          alert('닉네임을 2글자이상 10글자이하로 입력해주세요.');
        }
      });
    } else if (!isValid.name) {
      inputRef.current[0].focus();
    }
  };

  return (
    <GetTemplate res="true" title="회원가입">
      <ContainerUl>
        <li>
          <Title>
            <h1>회원가입</h1>
          </Title>
        </li>
        <li>
          <InputDiv
            id="name"
            name="name"
            labelName="닉네임"
            placeholder="2글자 이상 10글자 이하로 입력해주세요."
            value={name}
            inputRef={(el) => (inputRef.current[0] = el)}
            validText={validText.name}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
          />
        </li>
        <li>
          <InputDiv
            id="email"
            name="email"
            labelName="이메일"
            placeholder="이메일"
            value={email}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
            disabled={true}
          />
        </li>
        <li>
          <LoginButton onClick={handleClick} name="회원가입" />
        </li>
      </ContainerUl>
    </GetTemplate>
  );
}

export default SignupOauthUl;

const ContainerUl = styled.ul`
  width: 300px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  list-style: none;

  > li {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;

    > * {
      width: 100%;
    }
  }
`;
const Title = styled.title`
  display: flex;
  justify-content: center;
`;
