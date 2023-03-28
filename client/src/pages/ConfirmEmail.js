import styled from 'styled-components';
import ConfirmEmailDiv from '../components/signup/ConfirmEmailDiv';

function ConfirmEmail() {
  return (
    <ContainerDiv className="margininside">
      <ConfirmEmailDiv pathName="confirm" />
    </ContainerDiv>
  );
}

export default ConfirmEmail;

const ContainerDiv = styled.div`
  justify-content: center;
`;
