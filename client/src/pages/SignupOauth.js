import styled from 'styled-components';
import SignupOauthUl from '../components/signup/SignupOauthUl';

function SignupOauth() {
  return (
    <ContainerDiv className="margininside">
      <SignupOauthUl />
    </ContainerDiv>
  );
}

export default SignupOauth;

const ContainerDiv = styled.div`
  justify-content: center;
`;
