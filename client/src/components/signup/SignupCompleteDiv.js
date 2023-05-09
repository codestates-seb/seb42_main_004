import styled from 'styled-components';
import { AiOutlineUser } from '@react-icons/all-files/ai/AiOutlineUser.esm';
import { useNavigate } from 'react-router-dom';
import GetTemplate from '../commons/GetTemplate';

function SignupCompleteDiv() {
  const navigate = useNavigate();

  const handleNoClick = () => {
    navigate('/login');
  };
  const handleOkClick = () => {
    navigate('/email/confirm');
  };

  return (
    <GetTemplate res="true" title="회원가입 완료">
      <ContentDiv>
        <div>
          <AiOutlineUser size={50} color={'var(--signature)'} />
          <CompleteDiv>회원가입이 완료되었습니다.</CompleteDiv>
          <div>결제하려면 이메일 인증이 필요합니다.</div>
          <div>지금 하시겠습니까?</div>
          <div>
            <button onClick={handleNoClick} className="linkstyle">
              나중에 하기
            </button>
            <Button onClick={handleOkClick} className="buttonstyle shadow">
              지금하기
            </Button>
          </div>
        </div>
      </ContentDiv>
    </GetTemplate>
  );
}

export default SignupCompleteDiv;

const ContentDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--signature);
    background-color: var(--white_020);

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.2rem;

      :last-child {
        width: 60%;
        margin-top: 2rem;

        > button:first-child {
          border: none;
          background-color: transparent;
        }
      }

      @media (max-width: 480px) {
        font-size: 1.2rem;
      }

      @media (min-width: 481px) and (max-width: 768px) {
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 80%;
  }
`;
const CompleteDiv = styled.div`
  font-family: 'IBM Plex Sans KR', sans-serif !important;
  font-size: 2rem !important;
`;
const Button = styled.button`
  width: 120px;
  border: 1px solid var(--input_blue);
  color: var(--white);
  background-color: var(--input_blue);
`;
