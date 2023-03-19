import styled from 'styled-components';

function LoginButton({ name, onClick }) {
  return (
    <Button onClick={onClick} className="buttonstyle">
      {name}
    </Button>
  );
}

export default LoginButton;

const Button = styled.button`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--signature);
  background-color: var(--signature);
  color: var(--white);
  margin-top: 0.8rem;

  > div {
    margin-left: 0.5rem;
  }
`;
