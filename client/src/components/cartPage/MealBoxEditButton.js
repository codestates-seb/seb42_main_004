import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
import { addProductInBox } from '../../reducers/customReducer';

function MealBoxEditButton({ cartMealboxId }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { mealboxes } = useSelector((state) => state.cartReducer.cart);

  let customPageLink = () => {
    let idx = mealboxes.findIndex(
      (el) => String(el.cartMealboxId) === String(cartMealboxId)
    );
    let [mealBoxData, quantity] = [
      mealboxes[idx].products,
      mealboxes[idx].quantity,
    ];

    dispatch(addProductInBox(mealBoxData));
    navigate('/custom', { state: { cartMealboxId, quantity } });
  };

  return <Button onClick={customPageLink}>커스텀 하기</Button>;
}

export default MealBoxEditButton;

const Button = styled(TextButton)`
  margin-bottom: -0.1rem;
`;
