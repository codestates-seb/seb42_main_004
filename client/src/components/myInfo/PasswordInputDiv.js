import styled, { css } from 'styled-components';

function PasswordInputDiv({
  id,
  name,
  labelName,
  value,
  inputRef,
  validText,
  onChange,
}) {
  return (
    <ContainerDiv>
      <label htmlFor={id}>{labelName}</label>
      <BottomDiv validText={validText}>
        <input
          id={id}
          name={name}
          className="inputstyle"
          type="password"
          ref={inputRef}
          value={value}
          onChange={onChange}
        ></input>
        <div>{validText}</div>
      </BottomDiv>
    </ContainerDiv>
  );
}

export default PasswordInputDiv;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  > label {
    width: 110px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 1rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;
const BottomDiv = styled.div`
  width: 100%;
  flex-grow: 1;

  > input {
    width: 60%;
    height: 35px;
    ${({ validText }) =>
      validText &&
      css`
        padding: 0.5rem 1.5rem;
        border: 1px solid rgba(216, 75, 75, 1);
        border-radius: 4px;

        &:focus,
        :focus-within {
          border: 2px solid rgba(216, 75, 75, 1);
          outline: none;
        }
      `}

    @media  (max-width: 768px) {
      width: 100%;
    }
  }

  > div {
    padding: 0.5rem 0;
    color: rgba(216, 75, 75, 1);
  }
`;
