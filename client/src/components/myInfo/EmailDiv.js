import styled from 'styled-components';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function EmainDiv({ name, value, status }) {
  return (
    <ContainerDiv>
      <TitleDiv>{name}</TitleDiv>
      {status === 'USER_TMP' ? (
        <>
          <div>{value}</div>
          <ConfirmDiv>
            <button className="buttonstyle shadow">인증하기</button>
          </ConfirmDiv>
        </>
      ) : (
        <>
          <div>{value}</div>
          <ConfirmDiv>
            <AiOutlineCheckCircle size={25} color="green" />
            <div>인증완료</div>
          </ConfirmDiv>
        </>
      )}
    </ContainerDiv>
  );
}

export default EmainDiv;

const ContainerDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > div:last-child {
    flex-grow: 1;
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
    justify-content: flex-start;
    margin-right: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 60%;
    justify-content: flex-start;
    margin-right: 0;
  }
`;
const ConfirmDiv = styled.div`
  margin-left: 1rem;
`;
