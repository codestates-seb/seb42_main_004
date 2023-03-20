import styled from 'styled-components';
import ContentInputDiv from '../components/myInfo/ContentInputDiv';
import MyInfoButton from '../components/myInfo/MyInfoButton';

function SendEmail() {
  return (
    <ContainerDiv className="margininside">
      <SendDiv>
        <div>
          <ContentInputDiv id="email" labelName="이메일" value="" />
          <div>
            <MyInfoButton text="이메일 발송" />
          </div>
        </div>
      </SendDiv>
    </ContainerDiv>
  );
}

export default SendEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
const SendDiv = styled.div`
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 30%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 3px solid var(--signature);
    background-color: var(--white_020);

    input {
      width: 70%;
    }

    > div:last-child {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  button {
    width: 30%;
  }
`;
