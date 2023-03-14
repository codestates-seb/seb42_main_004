import styled from 'styled-components';
import MyInfoUl from '../components/myInfo/MyInfoUl';

function MyInfo() {
  return (
    <ContainerDiv className="margininside">
      <MyInfoUl />
    </ContainerDiv>
  );
}

export default MyInfo;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
