import styled from 'styled-components';

function MealBoxItemsDiv({ products }) {
  return (
    <ItemsDiv>
      {products.map((el, idx) => {
        let { name, quantity } = el;
        return (
          <div key={idx}>
            {name}&#215;{quantity}
          </div>
        );
      })}
    </ItemsDiv>
  );
}

export default MealBoxItemsDiv;

const ItemsDiv = styled.div`
  > div {
    display: flex;
  }
`;
