import styled from 'styled-components';
import SignupCompleteDiv from '../components/signup/SignupCompleteDiv';

function SignupComplete() {
  return (
    <ContainerDiv className="margininside">
      <SignupCompleteDiv />
    </ContainerDiv>
  );
}

export default SignupComplete;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
