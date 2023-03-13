import styled from 'styled-components';

function MealBoxDeleteButton() {
  return <DeleteButton>삭제</DeleteButton>;
}

export default MealBoxDeleteButton;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  height: fit-content;
`;
