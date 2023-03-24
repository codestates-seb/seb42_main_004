import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoResult from '../components/commons/NoResult';
import ProductLi from '../components/product/ProductLi';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import { MealBoxesWrapDiv, SearchResultH3 } from './AllBoxes';
import useGET from '../util/useGET';
import useFilterSearch from '../util/useFilterSearch';

function Products() {
  const { admin } = useSelector((state) => state.authReducer);
  let { pathname, search } = useLocation();
  if (!search) search = '?page=1&sort=id&dir=DESC';

  const [res, isPending, error, getData] = useGET(
    `${admin ? '/admin' : ''}${pathname}${search}`
  );
  const [toFilterSearchDiv, errorWord, paginationUrl] = useFilterSearch(false);

  const navigate = useNavigate();

  return (
    <GetTemplate isPending={isPending} error={error} res={res?.data}>
      <ContainerDiv className="margininside">
        <h1>구성품 설명</h1>
        <FilterSearchDiv placeholder="고구마" {...toFilterSearchDiv} />
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
