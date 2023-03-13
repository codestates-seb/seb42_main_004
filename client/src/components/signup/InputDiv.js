import styled from 'styled-components';

function InputDiv({ name, id, placeholder }) {
  return (
    <ContainerDiv>
      <label htmlFor={id}>{name}</label>
      <input className="inputstyle" id={id} placeholder={placeholder}></input>
    </ContainerDiv>
  );
}

export default InputDiv;

const ContainerDiv = styled.div`
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
