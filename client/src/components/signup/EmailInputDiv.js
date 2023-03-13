import styled from 'styled-components';

function EmailInputDiv() {
  return (
    <InputDiv>
      <ConfirmDiv>
        <label htmlFor="email">이메일</label>
        <button className="buttonstyle shadow">이메일 확인</button>
      </ConfirmDiv>
      <input
        className="inputstyle"
        id="email"
        placeholder="example@email.com"
      ></input>
    </InputDiv>
  );
}

export default EmailInputDiv;

const InputDiv = styled.div`
  height: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > label {
    height: 20px;
  }

  > input {
    height: 48px;
    padding-right: 3rem;
  }
`;
const ConfirmDiv = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    padding: 0.1rem 0.5rem;
    border-radius: 4px;
    border: none;
    background-color: var(--product_cocoa);
  }
`;
