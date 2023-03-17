import styled from 'styled-components';
import EmailDiv from '../components/signup/EmailDiv';

function ConfirmEmail() {
  return (
    <ContainerDiv className="margininside">
      <EmailDiv pathName="confirm" />
    </ContainerDiv>
  );
}

export default ConfirmEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
