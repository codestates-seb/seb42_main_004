import styled from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import getData from '../../util/getData';

function EmailDiv({ name, value, status, request }) {
  const navigate = useNavigate();

  const handleClick = () => {
    getData('/users/resend').then(() => {
      navigate('/email/confirm', { state: { sendEmail: value } });
    });
  };

  return (
    <ContainerDiv>
      {name ? <TitleDiv>{name}</TitleDiv> : null}
      {status === 'USER_TMP' || status === 'USER_GOOGLE' ? (
        <>
          {request ? null : <div>{value}</div>}
          <ConfirmSpan>
            <button onClick={handleClick} className="buttonstyle shadow">
              인증하기
            </button>
          </ConfirmSpan>
        </>
      ) : (
        <>
          <div>{value}</div>
          <ConfirmSpan>
            <OkIcon size={25} />
            <span>인증완료</span>
          </ConfirmSpan>
        </>
      )}
    </ContainerDiv>
  );
}

export default EmailDiv;

const ContainerDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    padding: 0 0.5rem;
    border: 1px solid var(--green);
    color: var(--green);
    background-color: var(--white);
  }
`;
const TitleDiv = styled.div`
  flex-basis: 75px;
  margin-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  font-family: 'IBM Plex Sans KR', sans-serif;

  @media (max-width: 480px) {
    width: 80%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 60%;
  }
`;
const ConfirmSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;

  > span {
    padding-left: 0.2rem;
    color: var(--green);
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;
const OkIcon = styled(AiOutlineCheckCircle)`
  color: var(--green);
`;
