import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
import { resEx } from '../components/cartPage/dummyData';
import { useEffect, useState } from 'react';
// import getData from '../util/getData';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../reducers/cartReducer';

function Cart() {
  let dispatch = useDispatch();
  let isLogin = true;
  let { totalPrice, mealboxes } = useSelector(
    (state) => state.cartReducer.cart
  );
  let [renderPrice, setRenderPrice] = useState(totalPrice);

  // let calRenderPrice = (e, isChecked) => {
  //   let id = e.target.id;
  //   let idx = mealboxes.findIndex((el) => el.cartMealboxId === id);
  //   if (isChecked) {
  //     renderPrice += mealboxes[idx].price * mealboxes[idx].quantity;
  //   } else {
  //     renderPrice -= mealboxes[idx].price * mealboxes[idx].quantity;
  //   }
  // };

  // let checkItem = document.querySelectorAll('input')[0];
  // console.log(checkItem);

  useEffect(() => {
    if (isLogin) {
      // getData(`/users/cart/${`cartId`}`);
      dispatch(setCart(resEx.data));
    }
  }, []);

  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      <CartPageContent>
        <CartItemListUl>
          {mealboxes?.map((el) => {
            return (
              <CartItemLi
                key={el.cartMealboxId}
                mealbox={el}
                value={el.cartMealboxId}
                setRenderPrice={setRenderPrice}
              />
            );
          })}
        </CartItemListUl>
        <CartAside totalPrice={renderPrice ? renderPrice : totalPrice} />
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
