import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PasswordInputDiv from './PasswordInputDiv';
import MyInfoButton from './MyInfoButton';
import patchData from '../../util/patchData';
import useValid from '../../util/useValid';

function PasswordDiv() {
  const navigate = useNavigate();
  const [beforePassword, setBeforePassword] = useState('');
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [validText, isValid] = useValid(inputValue);
  const inputRef = useRef([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handlePassword = (e) => {
    setBeforePassword(e.target.value);
  };

  const handleClick = () => {
    if (isValid.password && isValid.passwordConfirm) {
      patchData('/users/password', {
        password: beforePassword,
        afterPassword: inputValue.password,
      }).then((data) => {
        if (data.status === 200) {
          alert('변경이 완료되었습니다.');
          navigate('/myinfo');
        } else {
          alert('비밀번호를 다시 입력해주세요');
          setInputValue({
            password: '',
            passwordConfirm: '',
          });
          setBeforePassword('');
        }
      });
    } else if (!beforePassword) {
      inputRef.current[0].focus();
    } else if (!isValid.name) {
      inputRef.current[1].focus();
    } else if (!isValid.email) {
      inputRef.current[2].focus();
    }
  };

  return (
    <ContentDiv>
      <EditDiv>
        <div>
          <PasswordInputDiv
            id="beforePassword"
            name="beforePassword"
            labelName="비밀번호"
            value={beforePassword}
            inputRef={(el) => (inputRef.current[0] = el)}
            onChange={handlePassword}
          />
        </div>
        <div>
          <PasswordInputDiv
            id="password"
            name="password"
            labelName="새 비밀번호"
            value={inputValue.password}
            inputRef={(el) => (inputRef.current[1] = el)}
            validText={validText.password}
            onChange={handleInput}
          />
        </div>
        <div>
          <PasswordInputDiv
            id="passwordConfirm"
            name="passwordConfirm"
            labelName="새 비밀번호 확인"
            value={inputValue.passwordConfirm}
            inputRef={(el) => (inputRef.current[2] = el)}
            validText={validText.passwordConfirm}
            onChange={handleInput}
          />
        </div>
      </EditDiv>
      <PasswordButtonDiv>
        <MyInfoButton onClick={handleClick} text="변경완료" />
        <button onClick={() => navigate('/myinfo')} className="linkstyle">
          취소
        </button>
      </PasswordButtonDiv>
    </ContentDiv>
  );
}

export default PasswordDiv;

const ContentDiv = styled.div`
  padding-bottom: 50px;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--black);
`;
const EditDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
`;
const PasswordButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > * {
    margin-top: 1rem;
  }

  button:last-child {
    border: none;
    background-color: transparent;
  }
`;
