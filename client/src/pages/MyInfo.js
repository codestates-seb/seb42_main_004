import styled from 'styled-components';
import TabBar from '../components/commons/TabBar';
import MyInfoUl from '../components/myInfo/MyInfoUl';

function MyInfo() {
  return (
    <ContainerDiv className="margininside">
      <TabBar pathName="MyInfo">
        <MyInfoUl />
      </TabBar>
    </ContainerDiv>
  );
}

export default MyInfo;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
