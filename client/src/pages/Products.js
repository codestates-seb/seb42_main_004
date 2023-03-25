import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const [toFilterSearchDiv, errorWord, paginationUrl, uri] =
    useFilterSearch(false);
  const [res, isPending, error, getData] = useGET(
    `${admin ? '/admin' : ''}${uri}`
  );
  const navigate = useNavigate();

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res?.data}
      title="전체 구성품 목록 보기"
    >
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
            ((uri.includes('?page=1&') && !uri.includes('search')) ||
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
