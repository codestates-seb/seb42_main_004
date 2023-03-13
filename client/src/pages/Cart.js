import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';

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
      </CartPageContent>
    </CartPageWrapper>
  );
}

export default Cart;

const CartPageWrapper = styled.div`
  flex-direction: column;
`;

const CartPageContent = styled.div`
  /* display: flex;
  justify-content: center; */
  /* width: 100%; */
`;

export const CartItemListUl = styled.ul`
  flex-grow: 1;

  > li {
    margin-bottom: 10px;
    list-style: none;
  }
`;
