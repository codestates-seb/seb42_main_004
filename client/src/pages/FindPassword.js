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
          />
          <div>
            <MyInfoButton text="확인" />
          </div>
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
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 30%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    border: 3px solid var(--signature);
    background-color: var(--white_020);

    input {
      width: 70%;
    }

    > div:last-child {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  button {
    width: 30%;
  }
`;
