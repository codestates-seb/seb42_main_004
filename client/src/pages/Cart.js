import styled from 'styled-components';
import CartItemLi from '../components/cartPage/CartItemLi';
import CartAside from '../components/commons/CartAside';
// import { resEx } from '../components/cartPage/dummyData';
import getData from '../util/getData';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../reducers/cartReducer';
import postData from '../util/postData';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Cart() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { isLogin } = useSelector((state) => state.authReducer);
  let { totalPrice, mealboxes } = useSelector(
    (state) => state.cartReducer.cart
  );
  let [renderPrice, setRenderPrice] = useState(totalPrice);

  let calcRenderPrice = () => {
    let checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    console.log(checkedItem);
    let checkedCartMealBoxId = Array.from(checkedItem).map((el) =>
      String(el.id)
    );

    let checkedPrice = mealboxes?.reduce((acc, cur) => {
      if (checkedCartMealBoxId.includes(String(cur.cartMealboxId))) {
        return acc + cur.price * cur.quantity;
      } else {
        return acc;
      }
    }, 0);

    setRenderPrice(checkedPrice);
  };

  let purchaseHandler = () => {
    if (!isLogin) {
      return navigate('/login');
      // session의 물품 장바구니에 추가 요청
    }

    let checkedItem = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    let checkedCartMealBoxId = Array.from(checkedItem).map((el) =>
      String(el.id)
    );

    let postReqData = mealboxes
      .filter((el) => {
        return checkedCartMealBoxId.includes(String(el.cartMealboxId));
      })
      .map((el) => {
        let { cartMealboxId, mealboxId, quantity } = el;
        return { cartMealboxId, mealboxId, quantity };
      });

    postData('/orders', { mealboxes: postReqData }).then((res) => {
      navigate(res.data, { state: checkedCartMealBoxId });
    });
  };

  useEffect(() => {
    if (isLogin) {
      getData('/users/cart').then((data) => {
        dispatch(setCart(data.data));
      });
    }
    calcRenderPrice();
  }, [mealboxes]);

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
                calcRenderPrice={calcRenderPrice}
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
