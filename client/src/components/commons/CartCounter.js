import styled from 'styled-components';
import { useSelector } from 'react-redux';
function CartCounter() {
  let { mealboxes } = useSelector((state) => state.cartReducer.cart);
  let count = mealboxes.length;
  return (
    <Round>
      <Count>{count}</Count>
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
