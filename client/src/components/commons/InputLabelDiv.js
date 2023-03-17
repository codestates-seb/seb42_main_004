import styled from 'styled-components';

function InputLabelDiv({
  label,
  id,
  value,
  onChange,
  placeholder,
  unit,
  maxLength,
  disabled,
}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <ModalInputDiv className="inputstyle" disabled={disabled}>
        <input
          disabled={disabled}
          id={id}
          maxLength={maxLength && maxLength}
          value={value}
          onChange={onChange && onChange}
          placeholder={placeholder && placeholder}
        />
        {unit && <span>{unit}</span>}
      </ModalInputDiv>
    </>
  );
}

export default InputLabelDiv;

const ModalInputDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(${(props) => (props.disabled ? '--gray' : '--white')});
  padding: 0.4rem;
  margin-bottom: 0.3rem;
  font-weight: 400;

  :focus-within {
    margin: -0.8px -0.8px calc(0.3rem - 0.8px);
  }

  > input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 0.4rem;
    width: 100%;
  }

  > span {
    font-size: 0.8rem;
  }
`;
