import styled from 'styled-components';

function CartCounter() {
  return (
    <Round>
      <Count>2</Count>
    </Round>
  );
}

export default CartCounter;

const Round = styled.div`
  position: absolute;
  top: 18px;
  right: -7px;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 100%;
`;

const Count = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 900;
  color: var(--white);
`;
