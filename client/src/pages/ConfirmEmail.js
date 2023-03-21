import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmEmailDiv from '../components/signup/ConfirmEmailDiv';

function ConfirmEmail() {
  const location = useLocation();
  const email = location.state ? location.state.email : '';

  return (
    <ContainerDiv className="margininside">
      <ConfirmEmailDiv pathName="confirm" email={email} />
    </ContainerDiv>
  );
}

export default ConfirmEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
