import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
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
  console.log(isValid);

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

  const handleClick = () => {
    let obj = {};
    for (const el in isValid) {
      if (!inputValue[el]) {
        obj = { ...obj, [el]: '필수 항목입니다.' };
      }
    }
    setValidText({ ...validText, ...obj });
    if (isValid.name) {
      alert('곧 백엔드랑 연결시킬 예정입니당:)');
    } else if (!isValid.name) {
      inputRef.current[0].focus();
    }
  };

  return (
    <GetTemplate res="true" title="한끼밀 회원가입">
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
