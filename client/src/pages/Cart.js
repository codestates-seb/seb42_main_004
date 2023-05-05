import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
import Empty from '../components/commons/Empty';
import { setCart } from '../reducers/cartReducer';
import postData from '../util/postData';
import getData from '../util/getData';

function Cart() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { isLogin } = useSelector((state) => state.authReducer);
  let { totalPrice, mealboxes } = useSelector(
    (state) => state.cartReducer.cart
  ) || { totalPrice: 0, mealboxes: [] };
  let [renderPrice, setRenderPrice] = useState(totalPrice);

  let calcRenderPrice = () => {
    let checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    let checkedCartMealBoxId = Array.from(checkedItem).map((el) =>
      String(el.id)
    );

    let checkedPrice = mealboxes?.reduce((acc, cur) => {
      return checkedCartMealBoxId.includes(String(cur.cartMealboxId))
        ? acc + cur.price * cur.quantity
        : acc;
    }, 0);

    setRenderPrice(checkedPrice);
  };

  let purchaseHandler = () => {
    if (!isLogin) {
      return navigate('/login');
    }

    let checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    let checkedCartMealBoxId = Array.from(checkedItem).map((el) =>
      String(el.id)
    );

    let postReqData = mealboxes
      .filter((el) => checkedCartMealBoxId.includes(String(el.cartMealboxId)))
      .map((el) => {
        let { cartMealboxId, mealboxId, quantity } = el;
        return { cartMealboxId, mealboxId, quantity };
      });

    postData('/orders', { mealboxes: postReqData }).then((res) => {
      if (res.status === 403) {
        navigate('/email/request');
      } else {
        navigate(res.data, { state: checkedCartMealBoxId });
      }
    });
  };

  useEffect(() => {
    calcRenderPrice();
  }, [mealboxes]);

  useEffect(() => {
    isLogin &&
      getData('/users/cart').then((res) => {
        dispatch(setCart(res.data));
      });
  }, []);

  return (
    <CartPageWrapper className="margininside">
      <h1>장바구니</h1>
      {totalPrice ? (
        <CartPageContent>
          <CartItemListUl>
            {mealboxes?.map((el) => (
              <CartItemLi
                key={el.cartMealboxId}
                mealbox={el}
                value={el.cartMealboxId}
                calcRenderPrice={calcRenderPrice}
              />
            ))}
          </CartItemListUl>
          <CartAside totalPrice={renderPrice} buttonClick={purchaseHandler} />
        </CartPageContent>
      ) : (
        <Empty />
      )}
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;
