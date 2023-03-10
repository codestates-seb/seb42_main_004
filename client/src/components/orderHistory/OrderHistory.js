import {
  CheckBoxAndCartItemLi,
  CartItemWrapperDiv,
} from '../cartPage/CartItemLi';
import { CartItemListUl } from '../../pages/Cart';
import MealBoxItemsDiv from '../cartPage/MealBoxItemsDiv';
function OrderHistory() {
  return (
    <CartItemListUl>
      <CheckBoxAndCartItemLi>
        <CartItemWrapperDiv>
          <h2>Custom</h2>
          <div>X2</div>
          <MealBoxItemsDiv />
        </CartItemWrapperDiv>
      </CheckBoxAndCartItemLi>
    </CartItemListUl>
  );
}

export default OrderHistory;
