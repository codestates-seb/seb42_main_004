import styled, { css } from 'styled-components';

function ContentInputDiv({
  id,
  name,
  labelName,
  placeholder,
  value,
  onChange,
  validText,
}) {
  return (
    <ContainerDiv validText={validText}>
      <label htmlFor={id}>{labelName}</label>
      {labelName && labelName === '프로필 사진' ? (
        <button className="buttonstyle shadow">{value}</button>
      ) : (
        <input
          id={id}
          name={name}
          className="inputstyle"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></input>
      )}
    </ContainerDiv>
  );
}

export default ContentInputDiv;

const ContainerDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > label {
    flex-basis: 75px;
    margin-right: 1.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: 'IBM Plex Sans KR', sans-serif;
    color: ${({ validText }) => (validText ? `var(--red)` : `var(--black)`)};

    @media (max-width: 480px) {
      width: 80%;
      justify-content: flex-start;
      margin-right: 0;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      width: 60%;
      justify-content: flex-start;
      margin-right: 0;
    }
  }

  > input {
    width: 60%;
    ${({ validText }) =>
      validText &&
      css`
        padding: 0.5rem 1.5rem;
        border: 1px solid var(--red);
        border-radius: 4px;

        &:focus,
        :focus-within {
          border: 2px solid var(--red);
          outline: none;
        }
      `}

    @media (max-width: 480px) {
      width: 80%;
    }
  }

  > button {
    height: 60%;
    padding: 0px 10px;
    border: none;
    background-color: var(--gray);
  }

  @media (max-width: 768px) {
    height: 70px;
    flex-direction: column;
    justify-content: space-between;
  }
`;
