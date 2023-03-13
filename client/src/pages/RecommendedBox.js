import { MealBoxesWrapDiv, MealBoxesUl } from './AllBoxes';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';

function RecommendedBox() {
  return (
    <MealBoxesWrapDiv className="margininside">
      <h1>추천 결과 페이지(｡•̀ᴗ-)✧</h1>
      <MealBoxesUl>
        <li>
          <h2>아침</h2>
          <MealBoxCardDiv />
        </li>
        <li>
          <h2>점심</h2>
          <MealBoxCardDiv />
        </li>
        <li>
          <h2>저녁</h2>
          <MealBoxCardDiv />
        </li>
      </MealBoxesUl>
    </MealBoxesWrapDiv>
  );
}

export default RecommendedBox;
