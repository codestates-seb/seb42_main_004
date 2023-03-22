import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
import { resEx } from '../components/cartPage/dummyData';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../reducers/cartReducer';
import getData from '../util/getData';
function Cart() {
  let dispatch = useDispatch();
  let isLogin = true;

  let render = () => {
    if (isLogin) {
      getData(`/users/cart/${`cartId`}`).then(() => {
        let { data } = resEx.data;
        dispatch(setCart(data));
      });
    }
  };

  let { data } = useSelector((state) => {
    return state.cartReducer;
  });

  let { totalPrice, mealboxes } = data;
  console.log(mealboxes);

  useEffect(() => {
    render();
  }, []);

  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      <CartPageContent>
        <CartItemListUl>
          {mealboxes?.map((el) => {
            return <CartItemLi key={el.mealboxId} mealbox={el} />;
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
