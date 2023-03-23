import styled from 'styled-components';

function MealBoxItemsDiv({ products }) {
  console.log(products);
  return (
    <ItemsDiv>
      {products.map((el, idx) => {
        let { name, quantity } = el;
        return (
          <div key={idx}>
            <div>{name}</div>
            <div>{`X${quantity}`}</div>
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
