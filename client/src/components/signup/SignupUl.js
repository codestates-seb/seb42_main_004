import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import postData from '../../util/postData';
import useValid from '../../util/useValid';
import LoginButton from '../login/LoginButton';
import InputDiv from './InputDiv';

function SignupUl() {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [validText, isValid, setValidText] = useValid(inputValue);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const { name, email, password, passwordConfirm } = inputValue;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleClick = () => {
    let obj = {};
    for (const el in isValid) {
      if (!isValid[el] && !inputValue[el]) {
        obj = { ...obj, [el]: '필수 항목입니다.' };
      }
    }
    setValidText({ ...validText, ...obj });
    if (
      isValid.name &&
      isValid.email &&
      isValid.password &&
      isValid.passwordConfirm
    ) {
      postData('/users', { name, email, password }).then((data) => {
        if (data.status === 409) {
          navigate('/email/send', { state: { email } });
        } else {
          navigate('/email/confirm');
        }
      });
    } else if (!isValid.name) {
      inputRef.current[0].focus();
    } else if (!isValid.email) {
      inputRef.current[1].focus();
    } else if (!isValid.password) {
      inputRef.current[2].focus();
    } else {
      inputRef.current[3].focus();
    }
  };

  return (
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
        />
      </li>
      <li>
        <InputDiv
          id="email"
          name="email"
          labelName="이메일"
          placeholder="이메일 형식으로 입력해주세요."
          value={email}
          inputRef={(el) => (inputRef.current[1] = el)}
          validText={validText.email}
          onChange={handleInput}
        />
      </li>
      <li>
        <InputDiv
          id="password"
          name="password"
          labelName="비밀번호"
          placeholder="영문, 숫자를 포함하여 8~20글자로 입력해주세요."
          value={password}
          inputRef={(el) => (inputRef.current[2] = el)}
          validText={validText.password}
          onChange={handleInput}
        />
      </li>
      <li>
        <InputDiv
          id="passwordConfirm"
          name="passwordConfirm"
          labelName="비밀번호 확인"
          placeholder="확인을 위해 비밀번호를 한번 더 입력해주세요."
          value={passwordConfirm}
          inputRef={(el) => (inputRef.current[3] = el)}
          validText={validText.passwordConfirm}
          onChange={handleInput}
        />
      </li>
      <li>
        <LoginButton onClick={handleClick} name="회원가입하기" />
      </li>
      <li>
        <LoginDiv onClick={() => navigate('/login')}>
          이미 아이디가 있으신가요? 로그인
        </LoginDiv>
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
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    color: var(--input_blue);
  }
`;
