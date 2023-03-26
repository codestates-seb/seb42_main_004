import styled from 'styled-components';
import { HiOutlineMail } from 'react-icons/hi';
import GetTemplate from '../commons/GetTemplate';
import EmailDiv from '../myInfo/EmailDiv';

function RequestEmailDiv({ email }) {
  return (
    <GetTemplate res="true" title="이메일 인증 완료 요청">
      <ContentDiv>
        <div>
          <HiOutlineMail size={50} color={'var(--signature)'} />
          <div>이메일 인증이 필요합니다.</div>
          <EmailDiv value={email} status="USER_TMP" request="true" />
        </div>
      </ContentDiv>
    </GetTemplate>
  );
}

export default RequestEmailDiv;

const ContentDiv = styled.div`
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--signature);
    background-color: var(--white_020);

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'IBM Plex Sans KR', sans-serif;
      font-size: 1.5rem;
      margin-top: 0.3rem;

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
