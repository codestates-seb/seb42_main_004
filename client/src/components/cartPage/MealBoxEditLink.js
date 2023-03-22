import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import deleteData from '../../util/deleteData';
import { TextButton } from '../commons/ModalDiv';
function MealBoxEditLink() {
  let navigate = useNavigate();
  let customPageLink = () => {
    deleteData(`/users/cart/${`cartId`}/${`cartMealBoxId`}`);
    // 데이터 같이 보내주기

    navigate('/custom');
  };

  return <Button onClick={customPageLink}>다시 담기</Button>;
}

export default MealBoxEditLink;

const Button = styled(TextButton)`
  margin-bottom: -0.1rem;
`;
