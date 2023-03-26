import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RequestEmailDiv from '../components/signup/RequestEmailDiv';

function RequestEmail() {
  const { email } = useSelector((state) => state.authReducer.user);

  return (
    <ContainerDiv className="margininside">
      <RequestEmailDiv email={email} />
    </ContainerDiv>
  );
}

export default RequestEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
