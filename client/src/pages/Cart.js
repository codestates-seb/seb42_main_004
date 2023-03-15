import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
import { InAsideDiv } from './Custom';
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
        <CartAside
          inDiv={
            <InnerDiv>
              <div>총 결제금액</div>
              <div>56,900원</div>
            </InnerDiv>
          }
        />
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

  > aside {
    > div {
      display: flex;
      justify-content: center;

      @media (max-width: 480px) {
        box-shadow: none;
        border-top: 2px solid var(--signature);
      }
    }
  }
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

const InnerDiv = styled(InAsideDiv)`
  height: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;

  > div:last-child {
    font-size: 2rem;
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 16px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;
