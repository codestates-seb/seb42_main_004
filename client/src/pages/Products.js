import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoResultDiv from '../components/commons/NoResultDiv';
import ProductLi from '../components/product/ProductLi';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import { MealBoxesUl, MealBoxesWrapDiv, SearchResultH3 } from './AllBoxes';
import useGET from '../util/useGET';
import useFilterSearch from '../util/useFilterSearch';

function Products() {
  const { isLogin, admin } = useSelector((state) => state.authReducer);
  const [path, setPath] = useState(null);
  const [toFilterSearchDiv, notFoundWord, paginationUrl, uri] =
    useFilterSearch(false);

  const [res, isPending, error, getData] = useGET(path);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && !isLogin) {
      setPath(null);
    } else if (isLogin) {
      setPath(`${admin ? '/admin' : ''}${uri}`);
    } else {
      setPath(uri);
    }
  }, [uri, isLogin]);

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res?.data}
      title="구성품 목록 보기"
    >
      <MealBoxesWrapDiv className="margininside">
        <h1>구성품 설명</h1>
        <FilterSearchDiv placeholder="고구마" {...toFilterSearchDiv} />
        {notFoundWord && (
          <SearchResultH3>
            검색결과 {res?.pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        {res.data?.length === 0 && (
          <NoResultDiv
            search={(word) => navigate(`/products/search?page=1&name=${word}`)}
            notFoundWord={notFoundWord}
            replaceWord={'단백질쉐이크'}
          />
        )}
        <ProductsUl>
          {admin &&
            ((uri.includes('?page=1&') && !uri.includes('search')) ||
              res.data?.length === 0) && (
              <ProductLi admin={admin} reload={getData} />
            )}
          {res.data?.length !== 0 &&
            res.data?.map((product) => (
              <ProductLi
                key={product.productId}
                product={product}
                admin={admin}
                reload={getData}
              />
            ))}
        </ProductsUl>
        <PaginationUl
          page={res?.pageInfo?.page}
          totalpage={res?.pageInfo?.totalPages}
          url={paginationUrl}
        />
      </MealBoxesWrapDiv>
    </GetTemplate>
  );
}

export default Products;

const ProductsUl = styled(MealBoxesUl)`
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 2vw;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
