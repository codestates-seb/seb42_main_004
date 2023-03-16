import styled from 'styled-components';
import EmailDiv from '../components/signup/EmailDiv';

function CompleteEmail() {
  return (
    <ContainerDiv className="margininside">
      <EmailDiv pathName="complete" />
    </ContainerDiv>
  );
}

export default CompleteEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
