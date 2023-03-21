import styled from 'styled-components';
import SendEmailDiv from '../components/signup/SendEmailDiv';

function SendEmail() {
  return (
    <ContainerDiv className="margininside">
      <SendEmailDiv />
    </ContainerDiv>
  );
}

export default SendEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
