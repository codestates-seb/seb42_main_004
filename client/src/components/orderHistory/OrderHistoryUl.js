import { CartItemListUl } from '../../pages/Cart';
import OrderHistoryItemLi from './OrderHistoryItemLi';

function OrderHistoryUl() {
  return (
    <CartItemListUl>
      <OrderHistoryItemLi />
      <OrderHistoryItemLi />
    </CartItemListUl>
  );
}

export default OrderHistoryUl;
