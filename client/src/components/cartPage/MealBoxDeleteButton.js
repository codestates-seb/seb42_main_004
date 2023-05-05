import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteCartItem } from '../../reducers/cartReducer';
import deleteData from '../../util/deleteData';

function MealBoxDeleteButton({ cartMealboxId }) {
  let { isLogin } = useSelector((state) => state.authReducer);
  let dispatch = useDispatch();

  let deleteHandler = () => {
    if (confirm('해당 밀박스를 장바구니에서 삭제하시겠습니까?')) {
      dispatch(deleteCartItem([cartMealboxId]));
      isLogin && deleteData(`/users/cart/${cartMealboxId}`);
      alert('장바구니에서 삭제되었습니다.');
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
  margin-right: 4px;
  white-space: nowrap;
`;
