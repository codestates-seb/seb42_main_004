import { useState } from 'react';
import styled from 'styled-components';
import LoginButton from './LoginButton';
import InputDiv from '../signup/InputDiv';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function LoginUl() {
  const [showPwd, setShowPwd] = useState(false);

  const handleClick = () => {
    setShowPwd(!showPwd);
  };

  return (
    <ContainerUl>
      <li>
        <Title>
          <h1>Login</h1>
        </Title>
      </li>
      <li>
        <InputDiv name="이메일" id="email" placeholder="example@email.com" />
      </li>
      <li>
        <PasswordDiv>
          <label htmlFor="password">비밀번호</label>
          <input
            className="inputstyle"
            type={showPwd ? 'text' : 'password'}
            id="password"
            placeholder="password"
          ></input>
          {showPwd ? (
            <IconDiv onClick={handleClick}>
              <AiOutlineEye size={20} />
            </IconDiv>
          ) : (
            <IconDiv onClick={handleClick}>
              <AiOutlineEyeInvisible size={20} />
            </IconDiv>
          )}
        </PasswordDiv>
      </li>
      <li>
        <CheckboxDiv>
          <input type="checkbox" id="auto"></input>
          <label htmlFor="auto">자동로그인</label>
        </CheckboxDiv>
      </li>
      <li>
        <LoginButton name="로그인"></LoginButton>
      </li>
      <li>
        <Div>
          <div>비밀번호 찾기</div>
          <div>회원가입</div>
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
const PasswordDiv = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > label {
    height: 20px;
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
