import styled from 'styled-components';
import MyInfoButton from '../components/myInfo/MyInfoButton';
import PasswordInputDiv from '../components/myInfo/PasswordInputDiv';

function FindPassword() {
  return (
    <ContainerDiv className="margininside">
      <PasswordDiv>
        <div>
          <PasswordInputDiv id="newPassword" name="새 비밀번호" content="" />
          <PasswordInputDiv
            id="confirmNewPassword"
            name="새 비밀번호 확인"
            content=""
          />{' '}
          <MyInfoButton text="확인" />
        </div>
      </PasswordDiv>
    </ContainerDiv>
  );
}

export default FindPassword;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
const PasswordDiv = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    padding: 2rem;
    border: 1px solid var(--signature);
    display: flex;
    flex-direction: column;
  }
`;
