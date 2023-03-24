import styled from 'styled-components';

function PasswordInputDiv({ id, name, labelName, value }) {
  return (
    <ContainerDiv>
      <label htmlFor={id}>{labelName}</label>
      <input
        id={id}
        name={name}
        className="inputstyle"
        type="password"
        value={value}
      ></input>
    </ContainerDiv>
  );
}

export default PasswordInputDiv;

const ContainerDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  > label {
    flex-basis: 90px;
    margin-right: 1.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: 'IBM Plex Sans KR', sans-serif;

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
    width: 50%;

    @media (max-width: 480px) {
      width: 100%;
    }

    @media (min-width: 481px) and (max-width: 768px) {
      width: 80%;
    }
  }

  @media (max-width: 768px) {
    height: 70px;
    flex-direction: column;
    justify-content: space-between;
  }
`;
