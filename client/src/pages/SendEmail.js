import styled from 'styled-components';
import ContentInputDiv from '../components/myInfo/ContentInputDiv';
import MyInfoButton from '../components/myInfo/MyInfoButton';

function SendEmail() {
  return (
    <ContainerDiv className="margininside">
      <SendDiv>
        <div>
          <ContentInputDiv id="email" labelName="이메일" value="" />
          <MyInfoButton text="확인" />
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
