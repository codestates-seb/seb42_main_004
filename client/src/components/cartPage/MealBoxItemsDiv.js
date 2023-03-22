import styled from 'styled-components';

function MealBoxItemsDiv({ product }) {
  return (
    <ItemsDiv>
      {product.map((el, idx) => {
        let { productName, productQuantity } = el;
        return (
          <div key={idx}>
            <div>{productName}</div>
            <div>{`X${productQuantity}`}</div>
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
