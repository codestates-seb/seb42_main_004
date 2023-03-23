// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import deleteData from '../../util/deleteData';
import { TextButton } from '../commons/ModalDiv';
// import { useDispatch } from 'react-redux';
// import { deleteCartItem } from '../../reducers/cartReducer';

function MealBoxEditButton() {
  // let navigate = useNavigate();
  // let dispatch = useDispatch();

  let customPageLink = (e) => {
    let cartMealboxId =
      e.target.parentElement.parentElement.parentElement.value;
    let quantity = e.target.parentElement.parentElement.parentElement;
    console.log(quantity);
    // 삭제
    deleteData(`/users/cart/${cartMealboxId}`);
    // dispatch(deleteCartItem(cartMealboxId));

    // custom 페이지로 전환 & custom reducer에 저장(서버 요청 없음)
    // navigate('/custom');
  };

  return <Button onClick={customPageLink}>다시 담기</Button>;
}

export default MealBoxEditButton;

const Button = styled(TextButton)`
  margin-bottom: -0.1rem;
`;
