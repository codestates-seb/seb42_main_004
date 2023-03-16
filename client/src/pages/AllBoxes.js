// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';
import BannerLink from '../components/commons/BannerLink';
import PaginationUl from '../components/commons/PaginationUl';
import SearchBarDiv from '../components/commons/SearchBarDiv';
// import useGET from '../util/useGET';

function AllBoxes() {
  // const { page } = useParams();
  // const [data, isPending, error] = useGET(`/mealboxes/${page}`)

  return (
    <MealBoxesWrapDiv className="margininside">
      <BannerLink />
      <h1>{'맹쥬'}님 오늘도 건강한 하루되세요(｡•̀ᴗ-)✧</h1>
      <SearchBarDiv placeholder="healthy day 밀박스" />
      <MealBoxesUl>
        <li>
          <MealBoxCardDiv custom={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
        <li>
          <MealBoxCardDiv mealBox={1} />
        </li>
      </MealBoxesUl>
      <PaginationUl page={4} totalpage={7} url="" />
    </MealBoxesWrapDiv>
  );
}

export default AllBoxes;

export const MealBoxesWrapDiv = styled.div`
  flex-direction: column;
  min-height: calc(100vh - 330px - 5rem);
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
