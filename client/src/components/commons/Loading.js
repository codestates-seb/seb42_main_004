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
  justify-content: center;
`;
const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
