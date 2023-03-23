import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductInBox, setIdName } from '../reducers/customReducer';

function goToCustom(mealBox, admin) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const aux = () => {
    if (mealBox?.products) {
      dispatch(addProductInBox(mealBox.products));
      if (admin) {
        dispatch(
          setIdName({ name: mealBox.name, mealboxId: mealBox.mealboxId })
        );
      }
    }
    navigate('/custom');
  };
  return aux;
}

export default goToCustom;
