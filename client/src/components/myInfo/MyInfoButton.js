import styled from 'styled-components';

function MyInfoButton({ text }) {
  return <Button className="buttonstyle shadow">{text}</Button>;
}

export default MyInfoButton;

const Button = styled.button`
  padding: 0px 20px;
  height: 30px;
  color: var(--white);
  border: none;
  background-color: var(--signature);
`;
