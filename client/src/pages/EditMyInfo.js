import styled from 'styled-components';
import TabBar from '../components/commons/TabBar';
import EditMyInfoUl from '../components/myInfo/EditMyInfoUl';

function EditMyInfo() {
  return (
    <ContainerDiv className="margininside">
      <TabBar pathName="MyInfo">
        <EditMyInfoUl />
      </TabBar>
    </ContainerDiv>
  );
}

export default EditMyInfo;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
