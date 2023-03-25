import styled from 'styled-components';
import GetTemplate from '../commons/GetTemplate';
import LoginButton from '../login/LoginButton';
import InputDiv from './InputDiv';

function SignupOauthUl() {
  return (
    <GetTemplate res="true" title="한끼밀 회원가입">
      <ContainerUl>
        <li>
          <Title>
            <h1>Signup</h1>
          </Title>
        </li>
        <li>
          <InputDiv name="닉네임" id="nickname" placeholder="nickname" />
        </li>
        <li>
          <InputDiv name="이메일" id="email" placeholder="email" />
        </li>
        <li>
          <LoginButton name="회원가입" />
        </li>
      </ContainerUl>
    </GetTemplate>
  );
}

export default SignupOauthUl;

const ContainerUl = styled.ul`
  width: 300px;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
  list-style: none;

  > li {
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;

    > * {
      width: 100%;
    }
  }
`;
const Title = styled.title`
  display: flex;
  justify-content: center;
`;
