import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
import { resEx } from '../components/cartPage/dummyData';
import { useEffect } from 'react';
// import getData from '../util/getData';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginCart } from '../reducers/guestCartReducer';

function Cart() {
  let dispatch = useDispatch();
  let isLogin = true;
  let { totalPrice, mealboxes } = useSelector(
    (state) => state.guestCartReducer.guestCart
  );

  useEffect(() => {
    if (isLogin) {
      // getData(`/users/cart/${`cartId`}`);
      dispatch(setLoginCart(resEx.data));
    }
  }, []);

  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      <CartPageContent>
        <CartItemListUl>
          {mealboxes?.map((el, idx) => {
            return <CartItemLi key={idx} mealbox={el} />;
          })}
        </CartItemListUl>
        <CartAside totalPrice={totalPrice} />
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
