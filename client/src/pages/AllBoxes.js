import { useState } from 'react';
import styled from 'styled-components';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';
import PaginationUl from '../components/commons/PaginationUl';

function AllBoxes() {
  const [nextPage, setNextPage] = useState();
  // TODO GET
  // const [mealboxes, error] = useGET(nextPage)
  console.log(nextPage);

  return (
    <MealBoxesWrapDiv className="margininside">
      <h1>{'맹쥬'}님 오늘도 건강한 하루되세요(｡•̀ᴗ-)✧</h1>
      <MealBoxesUl>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
        <li>
          <MealBoxCardDiv />
        </li>
      </MealBoxesUl>
      <PaginationUl nowpage={4} totalpage={7} setNextPage={setNextPage} />
    </MealBoxesWrapDiv>
  );
}

export default AllBoxes;

export const MealBoxesWrapDiv = styled.div`
  flex-direction: column;
  min-height: 100vh;
`;
export const MealBoxesUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 3rem;
  column-gap: 4rem;
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
