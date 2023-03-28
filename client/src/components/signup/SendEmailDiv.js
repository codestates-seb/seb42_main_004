import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import postData from '../../util/postData';
import GetTemplate from '../commons/GetTemplate';
import ContentInputDiv from '../myInfo/ContentInputDiv';
import MyInfoButton from '../myInfo/MyInfoButton';

function SendEmailDiv({ pathName }) {
  const [sendEmail, setSendEmail] = useState('');
  const [valid, setValid] = useState({
    text: '',
    isValid: false,
  });
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.authReducer);

  const handleChange = (e) => {
    setSendEmail(e.target.value);
  };

  const handleSignupClick = () => {
    if (valid.isValid) {
      postData('/users/recovery/signup/send', {
        emailSignUp: email,
        emailNeedToSend: sendEmail,
      }).then(() => {
        navigate('/email/confirm', { state: { sendEmail: sendEmail } });
      });
    } else if (!valid.isValid && !sendEmail) {
      setValid({ text: '이메일을 입력해주세요.', isValid: false });
    }
  };

  const handleClick = () => {
    if (valid.isValid) {
      postData('/users/recovery/password/send', {
        email: sendEmail,
      }).then(() => {
        navigate('/email/confirm', { state: { sendEmail: sendEmail } });
      });
    } else if (!valid.isValid && !sendEmail) {
      setValid({ text: '이메일을 입력해주세요.', isValid: false });
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
    const exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exp.test(sendEmail)) {
      setValid({ text: '', isValid: true });
    } else if (!sendEmail) {
      setValid({ text: '', isValid: false });
    } else {
      setValid({ text: '이메일 형식이 올바르지 않습니다.', isValid: false });
    }
  }, [sendEmail]);

  return (
    <GetTemplate res="true" title="계정 복구 이메일 보내기">
      <SendDiv>
        <div>
          {pathName ? (
            <div>
              {`이미 가입된 계정입니다 :(`}
              <br /> 이메일 주소를 입력하면 복구 링크를 보내드립니다.
            </div>
          ) : (
            <div>
              계정 비밀번호를 잊으셨나요?
              <br /> 이메일 주소를 입력하면 복구 링크를 보내드립니다.
            </div>
          )}
          <ContentInputDiv
            id="email"
            name="email"
            labelName="이메일"
            placeholder="example@email.com"
            value={sendEmail}
            onChange={handleChange}
            validText={valid.text}
          />
          {valid.text ? <ValidDiv>{valid.text}</ValidDiv> : null}
          <div>
            <MyInfoButton
              onClick={pathName ? handleSignupClick : handleClick}
              text="이메일 발송"
            />
          </div>
        </div>
      </SendDiv>
    </GetTemplate>
  );
}

export default SendEmailDiv;

const SendDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 3px solid var(--signature);
    background-color: var(--white_020);

    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;

      @media (max-width: 480px) {
        font-size: 1.2rem;
      }

      @media (min-width: 481px) and (max-width: 768px) {
        font-size: 1rem;
      }
    }

    input {
      width: 70%;

      @media (max-width: 480px) {
        width: 80%;
      }

      @media (min-width: 481px) and (max-width: 768px) {
        width: 60%;
      }
    }

    > div:last-child {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  button {
    width: 30%;

    @media (max-width: 480px) {
      width: 50%;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      width: 40%;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 80%;
  }
`;
const ValidDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--red);
`;
