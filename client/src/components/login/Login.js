import { useState } from 'react';
import styled, { css } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Login() {
  const [showPwd, setShowPwd] = useState(false);

  const handleClick = () => {
    setShowPwd(!showPwd);
  };

  return (
    <ContainerDiv className="margininside">
      <LoginUl>
        <li>
          <Title>
            <h1>Login</h1>
          </Title>
        </li>
        <li>
          <Button className="buttonstyle">
            <FcGoogle size={25} />
            <div>Sign in with Google</div>
          </Button>
        </li>
        <li>
          <InputDiv>
            <label htmlFor="email">이메일</label>
            <input
              className="inputstyle"
              id="email"
              placeholder="email"
            ></input>
          </InputDiv>
        </li>
        <li>
          <InputDiv>
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
          </InputDiv>
        </li>
        <li>
          <Button className="buttonstyle" name="login">
            로그인
          </Button>
        </li>
      </LoginUl>
    </ContainerDiv>
  );
}

export default Login;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
const LoginUl = styled.ul`
  width: 300px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  list-style: none;

  > li {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
      width: 100%;
    }
  }
`;
const Title = styled.title`
  display: flex;
  justify-content: center;
`;
const InputDiv = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  > input {
    height: 60%;
    padding-right: 3rem;
  }
`;
const IconDiv = styled.div`
  height: 40%;
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 13px;
  right: 13px;
  cursor: pointer;
`;
const Button = styled.button`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--black);
  background-color: var(--white);

  ${({ name }) =>
    name &&
    css`
      background-color: var(--black);
      color: var(--white);
    `}

  > div {
    margin-left: 0.5rem;
  }
`;
