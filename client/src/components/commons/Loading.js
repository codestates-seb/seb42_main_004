import styled from 'styled-components';
import loading from '../../assets/loading.gif';
import { ErrorBaseDiv } from '../../pages/Error';
import checkFooter from '../../util/checkFooter';

function Loading() {
  return (
    <ContainerDiv className="margininside" fullh={checkFooter() ? 1 : null}>
      <LoadingDiv>
        <img src={loading} alt="loading" />
      </LoadingDiv>
    </ContainerDiv>
  );
}

export default Loading;

const ContainerDiv = styled(ErrorBaseDiv)`
  justify-content: center;
`;
const LoadingDiv = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
