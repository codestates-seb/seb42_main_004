import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import ProductLi from '../components/product/ProductLi';
import useGET from '../util/useGET';

function Products() {
  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  if (!search) search = '?page=1&sort=id&dir=ASC';

  const [res, isPending, error] = useGET(`${pathname}${search}`);
  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState(['id', 'ASC']);
  // const [errorWord, setErrorWord] = useState(searchWord);

  const searchProduct = () => {
    navigate(paginationUrl(1));
  };

  const paginationUrl = (page) => {
    // setErrorWord(searchWord);
    return searchWord
      ? `/products/search?page=${page}&name=${searchWord}`
      : `/products?page=${page}&sort=${sortBy[0]}&dir=${sortBy[1]}`;
  };

  const sortProducts = (select) => {
    setSearchWord('');
    const sortBy = select.split('/');
    setSortBy(sortBy);
    navigate(`/products?page=1&sort=${sortBy[0]}&dir=${sortBy[1]}`);
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res?.data}>
      <ContainerDiv className="margininside">
        <h1>구성품 설명</h1>
        <FilterSearchDiv
          sortProducts={sortProducts}
          placeholder="고구마"
          searchSubject={searchProduct}
          setSearchWord={setSearchWord}
        />
        <ul>
          {res.data?.map((product) => (
            <ProductLi key={product.productId} product={product} />
          ))}
        </ul>
        <PaginationUl
          page={res?.pageInfo?.page}
          totalpage={res?.pageInfo?.totalPages}
          url={paginationUrl}
        />
      </ContainerDiv>
    </GetTemplate>
  );
}

export default Products;

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
