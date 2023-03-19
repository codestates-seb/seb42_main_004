import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
function MealBoxEditLink() {
  let navigate = useNavigate();
  let customPageLink = () => {
    navigate('/custom');
  };

  return <Button onClick={customPageLink}>다시 담기</Button>;
}

export default MealBoxEditLink;

const Button = styled(TextButton)`
  margin-bottom: -0.1rem;
`;
