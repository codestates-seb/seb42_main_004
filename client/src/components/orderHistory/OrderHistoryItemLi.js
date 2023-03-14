import {
  CartItemWrapperLi,
  CartItemTopDiv,
  CartItemBottomDiv,
} from '../cartPage/CartItemLi';
import MealBoxItemsDiv from '../cartPage/MealBoxItemsDiv';
import styled from 'styled-components';

function OrderHistoryItemLi() {
  return (
    <OrderHistoryWrapperLi>
      <CartItemTopDiv>
        <h2>Custom</h2>
        <div>X2</div>
      </CartItemTopDiv>
      <MealBoxItemBottemDiv>
        <MealBoxItemsDiv />
        <div>12,000원</div>
      </MealBoxItemBottemDiv>
    </OrderHistoryWrapperLi>
  );
}

export default OrderHistoryItemLi;

const MealBoxItemBottemDiv = styled(CartItemBottomDiv)`
  align-items: flex-end;
`;

const OrderHistoryWrapperLi = styled(CartItemWrapperLi)`
  background-color: var(--bucket_brown_070);
`;
