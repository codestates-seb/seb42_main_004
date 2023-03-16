import styled from 'styled-components';
import EditMyInfoUl from '../components/myInfo/EditMyInfoUl';

function EditMyInfo() {
  return (
    <ContainerDiv className="margininside">
      <EditMyInfoUl />
    </ContainerDiv>
  );
}

export default EditMyInfo;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
