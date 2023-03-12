import {
  CheckBoxAndCartItemLi,
  CartItemWrapperDiv,
  CartItemTopDiv,
  CartItemBottomDiv,
  CartItemBottomButtonsDiv,
} from '../cartPage/CartItemLi';
import { CartItemListUl } from '../../pages/Cart';
import MealBoxItemsDiv from '../cartPage/MealBoxItemsDiv';
import OrderCancelButton from './OrderCancelButton';

function OrderHistory() {
  return (
    <CartItemListUl>
      <CheckBoxAndCartItemLi>
        <CartItemWrapperDiv>
          <CartItemTopDiv>
            <h2>Custom</h2>
            <div>X2</div>
          </CartItemTopDiv>
          <CartItemBottomDiv>
            <MealBoxItemsDiv />
            <CartItemBottomButtonsDiv>
              <div>결제 금액</div>
              <OrderCancelButton />
            </CartItemBottomButtonsDiv>
          </CartItemBottomDiv>
        </CartItemWrapperDiv>
      </CheckBoxAndCartItemLi>
    </CartItemListUl>
  );
}

export default OrderHistory;
