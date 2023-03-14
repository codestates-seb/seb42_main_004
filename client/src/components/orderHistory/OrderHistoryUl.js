import styled from 'styled-components';
import { CartItemListUl } from '../../pages/Cart';
import OrderHistoryItemLi from './OrderHistoryItemLi';

function OrderHistoryUl() {
  return (
    <HistoryUl>
      <OrderHistoryItemLi />
      <OrderHistoryItemLi />
    </HistoryUl>
  );
}

export default OrderHistoryUl;

const HistoryUl = styled(CartItemListUl)`
  width: 100%;
`;
