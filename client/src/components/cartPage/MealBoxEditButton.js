import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addProductInBox } from '../../reducers/customReducer';
import deleteData from '../../util/deleteData';
import { TextButton } from '../commons/ModalDiv';
import { deleteCartItem } from '../../reducers/cartReducer';

function MealBoxEditButton() {
  let { isLogin } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { mealboxes } = useSelector((state) => state.cartReducer.cart);
  let customPageLink = (e) => {
    let cartMealboxId = e.target.parentElement.parentElement.parentElement.id;
    console.log(e.target.parentElement.parentElement.parentElement.id);
    // let quantity = e.target.parentElement.parentElement.parentElement;
    // console.log(cartMealboxId);
    // console.log(quantity);

    // 삭제
    isLogin && deleteData(`/users/cart/${cartMealboxId}`);
    dispatch(deleteCartItem(cartMealboxId));

    // custom reducer에 저장 & custom 페이지로 전환 (서버 요청 없음)
    let idx = mealboxes.findIndex((el) => {
      return String(el.cartMealboxId) === String(cartMealboxId);
    });
    let mealBoxData = mealboxes[idx].products;
    dispatch(addProductInBox(mealBoxData));
    navigate('/custom');
  };

  return <Button onClick={customPageLink}>다시 담기</Button>;
}

export default MealBoxEditButton;

const Button = styled(TextButton)`
  margin-bottom: -0.1rem;
`;
