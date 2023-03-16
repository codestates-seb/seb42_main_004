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
        <CartAside>
          <InnerDiv>
            <InnerPriceDiv>
              <span>총 결제금액</span>
              <span>56,900원</span>
            </InnerPriceDiv>
          </InnerDiv>
        </CartAside>
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

const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vw;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  background-color: var(--white_020);
  box-shadow: 0 0 0 2px var(--signature) inset, 2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    border-radius: 0;
    background-color: var(--white);
    box-shadow: none;
    border-top: 2px solid var(--signature);
  }
`;
const InnerPriceDiv = styled.div`
  display: flex;
  flex-direction: column;

  > span:last-child {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around !important;
    align-items: center;

    > span:last-child {
      font-size: 1.5rem;
    }
  }
`;
