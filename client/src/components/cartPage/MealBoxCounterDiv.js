import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
import { useDispatch, useSelector } from 'react-redux';
import { setMinus, setPlus } from '../../reducers/cartReducer';
import patchData from '../../util/patchData';
function MealBoxCounterDiv({ quantity }) {
  let { isLogin } = useSelector((state) => state.authReducer);
  let dispatch = useDispatch();

  let getCartMealboxId = (e) =>
    e.target.parentElement.parentElement.parentElement.parentElement.id;

  let handleMinus = (e) => {
    let cartMealboxId = getCartMealboxId(e);
    quantity && dispatch(setMinus(cartMealboxId));
    isLogin &&
      patchData('/users/cart', { cartMealboxId, quantity: quantity - 1 });
  };

  let handlePlus = (e) => {
    let cartMealboxId = getCartMealboxId(e);
    dispatch(setPlus(cartMealboxId));
    isLogin &&
      patchData('/users/cart', { cartMealboxId, quantity: quantity + 1 });
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
