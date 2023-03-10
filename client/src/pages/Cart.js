import styled from 'styled-components';
import CartItemLi from '../components/CartPage/CartItemLi';
import TotalPaymentBoxDiv from '../components/CartPage/TotalPaymentBoxDiv';

function Cart() {
  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      <CartPageContent>
        <CartItemListUl>
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
          <CartItemLi />
        </CartItemListUl>
        <TotalPaymentBoxDiv />
      </CartPageContent>
    </CartPageWrapper>
  );
}

export default Cart;

const CartPageWrapper = styled.div`
  flex-direction: column;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CartItemListUl = styled.ul`
  flex-grow: 1;
  > li {
    margin-bottom: 10px;
  }
`;
