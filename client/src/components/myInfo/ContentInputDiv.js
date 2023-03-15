import styled from 'styled-components';

function ContentInputDiv({ id, name, content }) {
  return (
    <ContainerDiv>
      <label htmlFor={id}>{name}</label>
      <input id={id} className="inputstyle" type="text" value={content}></input>
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
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  > input {
    width: 200px;
  }
`;
