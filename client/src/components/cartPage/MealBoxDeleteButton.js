import styled from 'styled-components';
import { deleteCartItem } from '../../reducers/cartReducer';
import { useDispatch } from 'react-redux';
import deleteData from '../../util/deleteData';
function MealBoxDeleteButton({ calRenderPrice }) {
  let isLogin = false;
  let dispatch = useDispatch();
  let deleteHandler = (e) => {
    let cartMealboxId =
      e.target.parentElement.parentElement.parentElement.value;

    if (confirm('장바구니에서 삭제하시겠습니까?')) {
      isLogin && deleteData(`/users/cart/${cartMealboxId}`);
      dispatch(deleteCartItem(cartMealboxId));
      alert('장바구니에서 삭제되었습니다.');
      calRenderPrice();
    }
  };
  return <DeleteButton onClick={deleteHandler}>삭제</DeleteButton>;
}

export default MealBoxDeleteButton;

export const DeleteButton = styled.button`
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.2rem;
  background-color: transparent;
  border: none;
  height: fit-content;
`;
