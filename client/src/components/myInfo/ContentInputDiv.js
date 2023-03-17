import styled from 'styled-components';

function ContentInputDiv({ id, labelName, value, onChange }) {
  return (
    <ContainerDiv>
      <label htmlFor={id}>{labelName}</label>
      {labelName && labelName === '프로필 사진' ? (
        <button className="buttonstyle shadow">{value}</button>
      ) : (
        <input
          id={id}
          className="inputstyle"
          type="text"
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
