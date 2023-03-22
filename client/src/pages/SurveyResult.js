import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Error from './Error';
import MealBoxCardDiv from '../components/allboxes/MealBoxCardDiv';
import { TextButton } from '../components/commons/ModalDiv';
import { MealBoxesWrapDiv, MealBoxesUl } from './AllBoxes';
import { deleteSurveyRcmd } from '../reducers/surveyRcmdReducer';

function SurveyResult() {
  const { surveyRcmd } = useSelector((state) => state.surveyRcmdReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const surveyRetry = () => {
    if (
      window.confirm(
        '추천 페이지로 돌아갑니다\n현재 추천 받은 밀박스는 삭제됩니다.'
      )
    ) {
      dispatch(deleteSurveyRcmd());
      navigate('/survey/question/1');
    }
  };

  return (
    <>
      {surveyRcmd.breakfast ? (
        <MealBoxesWrapDiv className="margininside">
          <h1>추천 결과 페이지(｡•̀ᴗ-)✧</h1>
          <MealBoxesUl>
            <li>
              <h2>아침</h2>
              <MealBoxCardDiv mealBox={surveyRcmd.breakfast} />
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
          <SurveyRetryDiv>
            <TextButton onClick={surveyRetry} className="linkstyle">
              다시 추천 받기
            </TextButton>
            <p>현재 추천 받은 밀박스가 사라집니다</p>
          </SurveyRetryDiv>
        </MealBoxesWrapDiv>
      ) : (
        <Error />
      )}
    </>
  );
}

export default SurveyResult;

const SurveyRetryDiv = styled.div`
  margin-top: 2rem;
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > button {
    margin-right: -4px;
  }
`;
