import styled from 'styled-components';
import loading from '../../assets/loading.gif';

function Loading() {
  return (
    <ContainerDiv className="margininside">
      <LoadingDiv>
        <img src={loading} alt="loading" />
      </LoadingDiv>
    </ContainerDiv>
  );
}

export default Loading;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
const LoadingDiv = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
