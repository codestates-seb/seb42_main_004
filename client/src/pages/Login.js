import styled from 'styled-components';
import LoginUl from '../components/login/LoginUl';

function Login() {
  return (
    <ContainerDiv className="margininside">
      <LoginUl />
    </ContainerDiv>
  );
}

export default Login;

const ContainerDiv = styled.div`
  justify-content: center;
`;
