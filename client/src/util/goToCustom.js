import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, setName, setId } from '../reducers/customReducer';

function goToCustom(mealbox, admin) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const aux = () => {
    if (mealbox?.products) {
      mealbox.products.forEach((product) => dispatch(addProduct(product)));
    }
    if (admin) {
      dispatch(setName(mealbox.name));
      dispatch(setId(mealbox.mealboxId));
    }
    navigate('/custom');
  };
  return aux;
}

export default goToCustom;
