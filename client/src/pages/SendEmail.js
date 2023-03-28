import styled from 'styled-components';
import SendEmailDiv from '../components/signup/SendEmailDiv';

function SendEmail({ pathName }) {
  return (
    <ContainerDiv className="margininside">
      <SendEmailDiv pathName={pathName} />
    </ContainerDiv>
  );
}

export default SendEmail;

const ContainerDiv = styled.div`
  justify-content: center;
`;
