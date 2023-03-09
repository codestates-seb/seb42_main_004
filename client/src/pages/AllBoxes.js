import { useState } from 'react';
import styled from 'styled-components';
import MealBoxCard from '../components/allboxes/MealBoxCard';
import Pagination from '../components/commons/Pagination';

function AllBoxes() {
  const [nextPage, setNextPage] = useState();
  // TODO GET
  // const [mealboxes, error] = useGET(nextPage)
  console.log(nextPage);

  return (
    <MealBoxexWrapDiv className="margininside">
      <h1>{'맹쥬'}님 오늘도 건강한 하루되세요(｡•̀ᴗ-)✧</h1>
      <MealBoxexUl>
        <MealBoxCard />
        <MealBoxCard />
        <MealBoxCard />
        <MealBoxCard />
        <MealBoxCard />
        <MealBoxCard />
      </MealBoxexUl>
      <Pagination nowpage={8} totalpage={10} setNextPage={setNextPage} />
    </MealBoxexWrapDiv>
  );
}

export default AllBoxes;

const MealBoxexWrapDiv = styled.div`
  flex-direction: column;
  background-color: var(--body_beige);
`;
const MealBoxexUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  row-gap: 3rem;
  column-gap: 4rem;
  width: 100%;
  height: 100%;
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
