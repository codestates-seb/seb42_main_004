import styled from 'styled-components';

function InputDiv({ id, name, labelName, placeholder, value, onChange }) {
  return (
    <ContainerDiv>
      <label htmlFor={id}>{labelName}</label>
      <input
        id={id}
        name={name}
        className="inputstyle"
        type={name && name.includes('password') ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
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
