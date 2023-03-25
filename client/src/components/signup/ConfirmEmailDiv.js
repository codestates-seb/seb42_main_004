import styled from 'styled-components';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GetTemplate from '../commons/GetTemplate';

function ConfirmEmailDiv({ pathName }) {
  const { email } = useSelector((state) => state.authReducer);
  const location = useLocation();
  const sendEmail = location.state?.sendEmail || '';

  return (
    <GetTemplate
      res="true"
      title={pathName ? '이메일 인증 완료' : '이메일 발송 확인'}
    >
      <ContentDiv>
        <div>
          {pathName === 'complete' ? (
            <>
              <MdOutlineMarkEmailRead size={50} color={'var(--signature)'} />
              <div>이메일 인증이 완료되었습니다.</div>
            </>
          ) : (
            <>
              <HiOutlineMailOpen size={50} color={'var(--signature)'} />
              <div>
                {sendEmail ? sendEmail : email}로 이메일을 발송했습니다.
              </div>
              <div>{`이메일을 확인해주세요:)`}</div>
            </>
          )}
        </div>
      </ContentDiv>
    </GetTemplate>
  );
}

export default ConfirmEmailDiv;

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
