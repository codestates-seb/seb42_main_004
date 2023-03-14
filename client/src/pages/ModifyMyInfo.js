import styled from 'styled-components';
import ModifyMyInfoUl from '../components/myInfo/ModifyMyInfoUl';

function ModifyMyInfo() {
  return (
    <ContainerDiv className="margininside">
      <ModifyMyInfoUl />
    </ContainerDiv>
  );
}

export default ModifyMyInfo;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
