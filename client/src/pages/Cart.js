import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';

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
        <CartAside totalPrice={56900} />
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
  justify-content: space-between;
`;

export const CartItemListUl = styled.ul`
  width: 60%;

  > li {
    margin-bottom: 10px;
    list-style: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
