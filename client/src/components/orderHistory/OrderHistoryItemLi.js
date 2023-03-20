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
        <MealBoxCounter>X2</MealBoxCounter>
      </CartItemTopDiv>
      <MealBoxItemBottemDiv>
        <MealBoxItemsDiv />
        <MealBoxInfo>
          <span>320kcal</span>
          <span>12,000원</span>
        </MealBoxInfo>
      </MealBoxItemBottemDiv>
    </OrderHistoryWrapperLi>
  );
}

export default OrderHistoryItemLi;

const OrderHistoryWrapperLi = styled(CartItemWrapperLi)`
  background-color: var(--bucket_brown_070);
`;

const MealBoxItemBottemDiv = styled(CartItemBottomDiv)`
  align-items: flex-end;
`;

const MealBoxCounter = styled.div`
  font-size: 1.2rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
`;

const MealBoxInfo = styled.div`
  > span:first-child {
    margin-right: 0.8rem;
  }
  > span:last-child {
    font-size: 1.2rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;
