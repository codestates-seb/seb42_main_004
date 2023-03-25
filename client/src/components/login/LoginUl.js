import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import postData from '../../util/postData';
import LoginButton from './LoginButton';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import parseToken from '../../util/parseToken';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../reducers/authReducer';

function LoginUl() {
  const { mealboxes } = useSelector((state) => state.cartReducer.cart);
  console.log(mealboxes);
  const [showPwd, setShowPwd] = useState(false);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const inputRef = useRef([]);
  const { email, password } = inputValue;
  const dispatch = useDispatch();

  const login = (token) => {
    if (!localStorage.getItem('accessToken')) {
      localStorage.setItem('accessToken', token);
      Auth();
      // addCart();
      window.location.reload();
    } else if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('accessToken') !== token
    ) {
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', token);
      Auth();
      // addCart();
      window.location.reload();
    }
  };

  const Auth = () => {
    const { exp, principal, roles } = parseToken(
      localStorage.getItem('accessToken')
    );
    dispatch(
      setAuth({
        isLogin: true,
        accessToken: localStorage.getItem('accessToken'),
        tokenExpirationDate: new Date(exp),
        user: principal,
        admin: roles.includes('ADMIN'),
      })
    );
  };

  // const addCart = () => {
  //   console.log(mealboxes);
  //   mealboxes.forEach((el) => {
  //     if (el.name === 'custom') {
  //       postData('/users/cart/custom', el);
  //     } else {
  //       postData('/users/cart', { mealboxId: el.mealboxId });
  //     }
  //   });
  // };

  const handleClick = () => {
    if (email && password) {
      postData('/login', { email, password }).then((res) => {
        if (res.status === 401) {
          alert('이메일 주소나 비밀번호가 틀립니다.');
          setInputValue({ ...inputValue, password: '' });
          inputRef.current[1].focus();
        } else {
          login(res.headers.authorization);
        }
      });
    } else if (!email) {
      inputRef.current[0].focus();
    } else if (!password) {
      inputRef.current[1].focus();
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handlePasswordClick = () => {
    setShowPwd(!showPwd);
  };

  return (
    <ContainerUl>
      <li>
        <Title>
          <h1>로그인</h1>
        </Title>
      </li>
      <li>
        <LoginDiv>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            className="inputstyle"
            placeholder="이메일"
            ref={(el) => (inputRef.current[0] = el)}
            value={email}
            onChange={handleInput}
          />
        </LoginDiv>
      </li>
      <li>
        <LoginDiv>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            className="inputstyle"
            type={showPwd ? 'text' : 'password'}
            placeholder="비밀번호"
            ref={(el) => (inputRef.current[1] = el)}
            value={password}
            onChange={handleInput}
          />
          {showPwd ? (
            <IconDiv onClick={handlePasswordClick}>
              <AiOutlineEye size={20} />
            </IconDiv>
          ) : (
            <IconDiv onClick={handlePasswordClick}>
              <AiOutlineEyeInvisible size={20} />
            </IconDiv>
          )}
        </LoginDiv>
      </li>
      <li>
        <CheckboxDiv>
          <input type="checkbox" id="auto"></input>
          <label htmlFor="auto">자동로그인</label>
        </CheckboxDiv>
      </li>
      <li>
        <LoginButton onClick={handleClick} name="로그인"></LoginButton>
      </li>
      <li>
        <Div>
          <LoginLink to="/email/send" className="linkstyle">
            비밀번호 찾기
          </LoginLink>
          <LoginLink to="/signup" className="linkstyle">
            회원가입
          </LoginLink>
        </Div>
      </li>
      <li>
        <GoogleButton className="buttonstyle">
          <FcGoogle size={25} />
          <div>Sign in with Google</div>
        </GoogleButton>
      </li>
    </ContainerUl>
  );
}

export default LoginUl;

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

  > li:last-child {
    margin-top: 0.5rem;
  }
`;
const Title = styled.title`
  display: flex;
  justify-content: center;
`;
const LoginDiv = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > label {
    height: 20px;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  > input {
    height: 48px;
    padding-right: 3rem;
  }
`;
const IconDiv = styled.div`
  height: 40%;
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 10px;
  right: 13px;
  cursor: pointer;
`;
const CheckboxDiv = styled.div`
  display: flex;
  align-items: flex-end;

  > * {
    cursor: pointer;
  }

  > input {
    width: 15px;
    height: 15px;
  }

  > label {
    margin-left: 0.3rem;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    cursor: pointer;

    &:hover {
      color: var(--input_blue);
    }
  }
`;
const GoogleButton = styled.button`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--black);
  background-color: var(--white);

  > div {
    margin-left: 0.5rem;
  }
`;
const LoginLink = styled(Link)`
  text-decoration: none;
`;
