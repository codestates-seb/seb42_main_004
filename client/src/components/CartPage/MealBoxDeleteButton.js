import styled from 'styled-components';

function MealBoxDeleteButton() {
  return <Button>삭제</Button>;
}

export default MealBoxDeleteButton;

const Button = styled.button`
  background-color: transparent;
  border: none;
  height: fit-content;
`;
