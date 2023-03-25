import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoResult from '../components/commons/NoResult';
import BannerLink from '../components/commons/BannerLink';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import useGET from '../util/useGET';
import useFilterSearch from '../util/useFilterSearch';

function AllBoxes() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
  let { pathname, search } = useLocation();
  if (!search) search = '?page=1&sort=id&dir=DESC';
  const [res, isPending, error, getData] = useGET(`${pathname}${search}`);
  const [toFilterSearchDiv, errorWord, paginationUrl] = useFilterSearch(true);

  return (
    <GetTemplate isPending={isPending} error={error} res={res?.data}>
      <MealBoxesWrapDiv className="margininside">
        <BannerLink />
        <h1>
          {user?.name && `${user.name}님 `}오늘도 건강한 하루되세요(｡•̀ᴗ-)✧
        </h1>
        <FilterSearchDiv
          placeholder="healthy day 밀박스"
          {...toFilterSearchDiv}
        />
        {errorWord && (
          <SearchResultH3>
            검색결과 {res?.pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        <MealBoxesUl>
          {((search.includes('?page=1&') && !pathname.includes('search')) ||
            res.data?.length === 0) && (
            <li>
              <MealBoxCardDiv />
            </li>
          )}
          {res.data?.length !== 0 ? (
            res.data?.map((mealbox) => (
              <li key={mealbox.mealboxId}>
                <MealBoxCardDiv mealBox={mealbox} reload={getData} />
              </li>
            ))
          ) : (
            <NoResult
              search={(word) =>
                navigate(`/mealboxes/search?page=1&name=${word}`)
              }
              errorWord={errorWord}
              replaceWord={'고단백질 아침 세트'}
            />
          )}
        </MealBoxesUl>
        <PaginationUl
          page={res?.pageInfo?.page}
          totalpage={res?.pageInfo?.totalPages}
          url={paginationUrl}
        />
      </MealBoxesWrapDiv>
    </GetTemplate>
  );
}

export default AllBoxes;

export const MealBoxesWrapDiv = styled.div`
  flex-direction: column;
`;
export const SearchResultH3 = styled.h3`
  margin-bottom: 0.5rem;
`;
export const MealBoxesUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 3rem;
  column-gap: 4vw;
  width: 100%;
  list-style: none;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2.5rem;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    row-gap: 2rem;
  }
`;
