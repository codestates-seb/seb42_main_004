import styled from 'styled-components';
import ElementItemLi from '../components/explain/ElementItemLi';

function Product() {
  const arr = ['달걀', '고구마', '사과', '감자', '오이'];
  return (
    <ContainerDiv className="margininside">
      <h1>구성품 설명</h1>
      <ul>
        {arr.map((el, idx) => (
          <ElementItemLi key={idx} el={el} />
        ))}
      </ul>
    </ContainerDiv>
  );
}

export default Product;

const ContainerDiv = styled.div`
  min-height: 100vh;
  flex-direction: column;

  > ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
  }
`;
