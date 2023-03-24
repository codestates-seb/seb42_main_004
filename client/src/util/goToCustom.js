import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductInBox, setIdNameImage } from '../reducers/customReducer';

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
    }
    navigate('/custom');
  };
  return aux;
}

export default goToCustom;
