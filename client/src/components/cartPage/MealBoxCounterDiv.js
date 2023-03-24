import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
import { useDispatch, useSelector } from 'react-redux';
import { setMinus, setPlus } from '../../reducers/cartReducer';
import patchData from '../../util/patchData';
function MealBoxCounterDiv({ quantity, calRenderPrice }) {
  console.log(quantity);

  let { isLogin } = useSelector((state) => state.authReducer);
  let dispatch = useDispatch();

  let getCartMealboxId = (e) =>
    e.target.parentElement.parentElement.parentElement.parentElement.id;

  let patchReq = (cartMealboxId) => {
    patchData('/users/cart', { cartMealboxId, quantity });
  };

  let handleMinus = (e) => {
    let cartMealboxId = getCartMealboxId(e);
    console.log(quantity);
    quantity && dispatch(setMinus(cartMealboxId));
    isLogin && patchReq(cartMealboxId); // 안되면 윗 줄로 올리고 quantity--
    calRenderPrice();
  };

  let handlePlus = (e) => {
    let cartMealboxId = getCartMealboxId(e);
    dispatch(setPlus(cartMealboxId));
    isLogin && patchReq(cartMealboxId);
    calRenderPrice();
  };

  return (
    <CounterDiv>
      <TextButton className="linkstyle" onClick={handleMinus}>
        &#8722;
      </TextButton>
      <Count>{quantity}</Count>
      <TextButton className="linkstyle" onClick={handlePlus}>
        &#43;
      </TextButton>
    </CounterDiv>
  );
}

export default MealBoxCounterDiv;

const CounterDiv = styled.div`
  display: flex;

  > button {
    padding: 0 5px;
    height: fit-content;
  }
`;

const Count = styled.div``;
