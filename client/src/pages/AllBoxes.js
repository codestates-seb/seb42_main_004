import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';
import BannerLink from '../components/commons/BannerLink';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import GetTemplate from '../components/commons/GetTemplate';
import { TextButton } from '../components/commons/ModalDiv';
import PaginationUl from '../components/commons/PaginationUl';
import useGET from '../util/useGET';

function AllBoxes() {
  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  if (!search) search = '?page=1&sort=id&dir=ASC';

  const [res, isPending, error] = useGET(`${pathname}${search}`);
  const [searchWord, setSearchWord] = useState('');
  const [errorWord, setErrorWord] = useState(searchWord);
  const [sortBy, setSortBy] = useState(['id', 'ASC']);

  const searchMealBox = () => {
    navigate(paginationUrl(1));
  };

  const paginationUrl = (page) => {
    setErrorWord(searchWord);
    return searchWord
      ? `/mealboxes/search?page=${page}&name=${searchWord}`
      : `/mealboxes?page=${page}&sort=${sortBy[0]}&dir=${sortBy[1]}`;
  };

  const sortProducts = (select) => {
    setSearchWord('');
    setSortBy(select.split('/'));
    navigate(paginationUrl(1));
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res?.data}>
      <MealBoxesWrapDiv className="margininside">
        <BannerLink />
        <h1>{'맹쥬'}님 오늘도 건강한 하루되세요(｡•̀ᴗ-)✧</h1>
        <FilterSearchDiv
          placeholder="healthy day 밀박스"
          sortProducts={sortProducts}
          searchSubject={searchMealBox}
          setSearchWord={setSearchWord}
        />
        {errorWord && (
          <SearchResultH3>
            검색결과 {res?.pageInfo?.totalElements?.toLocaleString('ko-KR')}개
          </SearchResultH3>
        )}
        <MealBoxesUl>
          {(search.includes('?page=1&') || res.data?.length === 0) && (
            <li>
              <MealBoxCardDiv custom={1} />
            </li>
          )}
          {res.data?.length !== 0 ? (
            res.data?.map((mealbox) => (
              <li key={mealbox.mealboxId}>
                <MealBoxCardDiv mealBox={mealbox} />
              </li>
            ))
          ) : (
            <div>
              찾고 계신 <span>{errorWord}</span>은(는) 목록에 추가될 예정입니다
              <br />
              {errorWord} 대신
              <TextButton
                className="linkstyle"
                onClick={() =>
                  navigate(
                    '/mealboxes/search?page=1&name=고단백질%20아침%20세트'
                  )
                }
              >
                고단백질 아침 세트
              </TextButton>
              는 어떠세요?
            </div>
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
  min-height: calc(100vh - 330px - 5rem);

  @media screen and (max-width: 768px) {
    min-height: calc(100vh - 280px - 5rem);
  }

  @media screen and (max-width: 480px) {
    min-height: calc(100vh - 230px - 5rem);
  }
`;
const SearchResultH3 = styled.h3`
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
