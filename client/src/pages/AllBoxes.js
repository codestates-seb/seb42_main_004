import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';
import BannerLink from '../components/commons/BannerLink';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import SearchBarDiv from '../components/commons/SearchBarDiv';
import useGET from '../util/useGET';

function AllBoxes() {
  const navigate = useNavigate();
  let { pathname, search } = useLocation();
  if (!search) navigate('/mealboxes?page=1');

  const [res, isPending, error] = useGET(`${pathname}${search}`);
  const [searchWord, setSearchWord] = useState('');

  const searchMealBox = () => {
    navigate(`/mealboxes/search?page=1&name=${searchWord}`);
  };

  const paginationUrl = (page) => {
    return searchWord
      ? `/mealboxes/search?page=${page}&name=${searchWord}`
      : `/mealboxes?page=${page}`;
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res?.data}>
      <MealBoxesWrapDiv className="margininside">
        <BannerLink />
        <h1>{'맹쥬'}님 오늘도 건강한 하루되세요(｡•̀ᴗ-)✧</h1>
        <SearchBarDiv
          placeholder="healthy day 밀박스"
          searchSubject={searchMealBox}
          setSearchWord={setSearchWord}
        />
        <MealBoxesUl>
          <li>
            <MealBoxCardDiv custom={1} />
          </li>
          {res?.data?.map((mealbox) => (
            <li key={mealbox.mealboxId}>
              <MealBoxCardDiv mealBox={mealbox} />
            </li>
          ))}
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
