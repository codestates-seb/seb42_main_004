import styled from 'styled-components';
import MyInfoUl from '../components/myInfo/MyInfoUl';

function ModifyPassword() {
  return (
    <ContainerDiv className="margininside">
      <MyInfoUl pathName="password" />
    </ContainerDiv>
  );
}

export default ModifyPassword;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
