import styled from 'styled-components';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import PaginationUl from '../components/commons/PaginationUl';
import ProductLi from '../components/product/ProductLi';

function Product() {
  const arr = ['달걀', '고구마', '사과', '감자', '오이'];
  return (
    <ContainerDiv className="margininside">
      <h1>구성품 설명</h1>
      <FilterSearchDiv />
      <ul>
        {arr.map((el, idx) => (
          <ProductLi key={idx} el={el} />
        ))}
      </ul>
      <PaginationUl page={4} totalpage={7} url="" />
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
