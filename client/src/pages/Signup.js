import styled from 'styled-components';
import SignupUl from '../components/signup/SignupUl';

function Signup() {
  return (
    <ContainerDiv className="margininside">
      <SignupUl />
    </ContainerDiv>
  );
}

export default Signup;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
