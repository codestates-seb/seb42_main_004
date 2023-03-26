import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addProductInBox,
  initializeCustom,
  setIdNameImage,
} from '../reducers/customReducer';

function goToCustom(mealBox, admin) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const aux = () => {
    if (mealBox?.products) {
      dispatch(addProductInBox(mealBox.products));
      if (admin) {
        const { name, mealboxId, imagePath } = mealBox;
        dispatch(setIdNameImage({ name, mealboxId, imagePath }));
      }
    } else if (!mealBox && admin) dispatch(initializeCustom());
    navigate('/custom');
  };
  return aux;
}

export default goToCustom;
