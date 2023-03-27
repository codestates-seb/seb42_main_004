import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
import { useDispatch, useSelector } from 'react-redux';
import { setMinus, setPlus, deleteCartItem } from '../../reducers/cartReducer';
import patchData from '../../util/patchData';
import deleteData from '../../util/deleteData';
import { HiPlus, HiMinus } from 'react-icons/hi';
function MealBoxCounterDiv({ quantity }) {
  let { isLogin } = useSelector((state) => state.authReducer);
  let dispatch = useDispatch();

  let getCartMealboxId = (e) =>
    e.target.parentElement.parentElement.parentElement.parentElement.id;

  let handleMinus = (e) => {
    let cartMealboxId = getCartMealboxId(e);
    if (quantity > 1) {
      dispatch(setMinus(cartMealboxId));
      isLogin &&
        patchData('/users/cart', { cartMealboxId, quantity: quantity - 1 });
    } else {
      if (confirm('해당 밀박스를 장바구니에서 삭제하시겠습니까?')) {
        isLogin && deleteData(`/users/cart/${cartMealboxId}`);
        dispatch(deleteCartItem([cartMealboxId]));
        alert('장바구니에서 삭제되었습니다.');
      }
    }
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
        <HiMinus size="20" />
      </TextButton>
      <Count>{quantity}</Count>
      <TextButton className="linkstyle" onClick={handlePlus}>
        <HiPlus size="20" />
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

  svg {
    padding-top: 5px;
    pointer-events: none;
    @media (max-width: 480px) {
      padding: 2.5px 0;
    }
  }
`;

const Count = styled.div`
  font-size: 1.2rem;
  height: fit-content;
`;
