import styled from 'styled-components';

function MealBoxItemsDiv() {
  return (
    <ItemsDiv>
      <div>
        <div>고구마</div>
        <div>X1</div>
      </div>
      <div>
        <div>고구마</div>
        <div>X1</div>
      </div>
    </ItemsDiv>
  );
}

export default MealBoxItemsDiv;

const ItemsDiv = styled.div`
  > div {
    display: flex;
  }
`;
