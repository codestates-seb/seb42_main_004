import { useState } from 'react';
import styled from 'styled-components';
import LoginButton from '../login/LoginButton';
import InputDiv from './InputDiv';

function SignupUl() {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { name, email, password, passwordConfirm } = inputValue;
  // const isValidEmail = email.includes('@') && email.includes('.');

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(inputValue);
  };

  return (
    <ContainerUl>
      <li>
        <Title>
          <h1>Signup</h1>
        </Title>
      </li>
      <li>
        <InputDiv
          id="name"
          name="name"
          labelName="닉네임"
          placeholder="nickname"
          value={name}
          onChange={handleInput}
        />
      </li>
      <li>
        <InputDiv
          id="email"
          name="email"
          labelName="이메일"
          placeholder="email"
          value={email}
          onChange={handleInput}
        />
      </li>
      <li>
        <InputDiv
          id="password"
          name="password"
          labelName="비밀번호"
          placeholder="password"
          value={password}
          onChange={handleInput}
        />
      </li>
      <li>
        <InputDiv
          id="passwordConfirm"
          name="passwordConfirm"
          labelName="비밀번호 확인"
          placeholder="passwordConfirm"
          value={passwordConfirm}
          onChange={handleInput}
        />
      </li>
      <li>
        <LoginButton name="회원가입" />
      </li>
      <li>
        <LoginDiv>이미 아이디가 있으신가요? 로그인</LoginDiv>
      </li>
    </ContainerUl>
  );
}

export default SignupUl;

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
const LoginDiv = styled.div`
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: var(--input_blue);
  }
`;
