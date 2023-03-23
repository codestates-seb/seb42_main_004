import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
// import { resEx } from '../components/cartPage/dummyData';
import { useEffect, useState } from 'react';
import getData from '../util/getData';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../reducers/cartReducer';
import postData from '../util/postData';

function Cart() {
  let dispatch = useDispatch();
  let { isLogin } = useSelector((state) => state.authReducer);
  let { totalPrice, mealboxes } = useSelector(
    (state) => state.cartReducer.cart
  );
  console.log(totalPrice, mealboxes);
  let [renderPrice, setRenderPrice] = useState(totalPrice);

  let calRenderPrice = () => {
    let checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    let checkedCartMealBoxId = Array.from(checkedItem).map((el) =>
      Number(el.id)
    );

    let checkedPrice = mealboxes?.reduce(
      (acc, cur) =>
        checkedCartMealBoxId.includes(cur.cartMealboxId)
          ? acc + cur.price * cur.quantity
          : acc,
      0
    );

    setRenderPrice(checkedPrice);
  };

  let purchaseHandler = () => {
    let checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    let checkedCartMealBoxId = Array.from(checkedItem).map((el) =>
      Number(el.id)
    );

    let postReqData = mealboxes
      .filter((el) => {
        return checkedCartMealBoxId.includes(el.cartMealboxId);
      })
      .map((el) => {
        let { cartMealboxId, mealboxId, quantity } = el;
        return { cartMealboxId, mealboxId, quantity };
      });
    console.log(postReqData);
    postData('/orders', { orderMealboxes: postReqData }, false);
  };

  useEffect(() => {
    calRenderPrice();
    console.log(isLogin);
    if (isLogin) {
      getData('/users/cart').then((data) => {
        console.log(data);
        dispatch(setCart(data));
      });
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
                calRenderPrice={calRenderPrice}
              />
            );
          })}
        </CartItemListUl>
        <CartAside totalPrice={renderPrice} buttonClick={purchaseHandler} />
      </CartPageContent>
    </CartPageWrapper>
  );
}

export default Cart;

const CartPageWrapper = styled.div`
  min-height: calc(100vh - 5rem - 50px);
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
