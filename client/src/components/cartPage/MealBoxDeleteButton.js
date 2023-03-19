import styled from 'styled-components';

function MealBoxDeleteButton() {
  return <DeleteButton>삭제</DeleteButton>;
}

export default MealBoxDeleteButton;

export const DeleteButton = styled.button`
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.2rem;
  background-color: transparent;
  border: none;
  height: fit-content;
`;
