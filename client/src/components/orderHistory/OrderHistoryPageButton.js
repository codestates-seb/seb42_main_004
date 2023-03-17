import styled from 'styled-components';

function OrderHistoryPageButton({ text, handler }) {
  return <Button onClick={handler}>{text}</Button>;
}

export default OrderHistoryPageButton;

const Button = styled.button`
  vertical-align: middle;
  padding: 0 8px;
  height: 25px;
  color: var(--white);
  border-radius: 6px;
  background-color: var(--signature);
`;
