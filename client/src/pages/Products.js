import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MealBoxesWrapDiv, SearchResultH3 } from './AllBoxes';
import ProductLi from '../components/product/ProductLi';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import useGET from '../util/useGET';
import NoResult from '../components/commons/NoResult';

function Products() {
  const { admin } = useSelector((state) => state.authReducer);
  let { pathname, search } = useLocation();
  if (!search) search = '?page=1&sort=id&dir=ASC';

  const [res, isPending, error, getData] = useGET(
    `${admin ? '/admin' : ''}${pathname}${search}`
  );
  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState(['id', 'ASC']);
  const [errorWord, setErrorWord] = useState(searchWord);
  const navigate = useNavigate();

  const searchProduct = () => {
    navigate(paginationUrl(1));
  };
  const paginationUrl = (page) => {
    setErrorWord(searchWord);
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
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
        {errorWord && (
          <SearchResultH3>
            검색결과 {res?.pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        <ul>
          {admin &&
            ((search.includes('?page=1&') && !pathname.includes('search')) ||
              res.data?.length === 0) && (
              <ProductLi admin={admin} reload={getData} />
            )}
          {res.data?.length !== 0 ? (
            res.data?.map((product) => (
              <ProductLi
                key={product.productId}
                product={product}
                admin={admin}
                reload={getData}
              />
            ))
          ) : (
            <NoResult
              search={(word) =>
                navigate(`/products/search?page=1&name=${word}`)
              }
              errorWord={errorWord}
              replaceWord={'단백질쉐이크'}
            />
          )}
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

const ContainerDiv = styled(MealBoxesWrapDiv)`
  > ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
  }
`;
