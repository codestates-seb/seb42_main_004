import { useSelector } from 'react-redux';
import { MealBoxesWrapDiv, MealBoxesUl } from './AllBoxes';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';

function SurveyResult() {
  const { surveyRcmd } = useSelector((state) => state.surveyRcmdReducer);

  return (
    <MealBoxesWrapDiv className="margininside">
      <h1>추천 결과 페이지(｡•̀ᴗ-)✧</h1>
      <MealBoxesUl>
        <li>
          <h2>아침</h2>
          <MealBoxCardDiv mealBox={surveyRcmd.morning} />
        </li>
        <li>
          <h2>점심</h2>
          <MealBoxCardDiv mealBox={surveyRcmd.lunch} />
        </li>
        <li>
          <h2>저녁</h2>
          <MealBoxCardDiv mealBox={surveyRcmd.dinner} />
        </li>
      </MealBoxesUl>
    </MealBoxesWrapDiv>
  );
}

export default SurveyResult;
