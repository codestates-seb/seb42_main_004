import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDietPlan, setReset } from '../../reducers/surveyQuestionReducer';
import { Option, ExplanationDiv } from './SurveyPage2';
import { SurveyH3 } from './SurveyPage1';
import PreAndNextButtons from './PreAndNextButtons';
import getData from '../../util/getData';
import SurveyBox from './SurveyBox';
import DietInfo from './DietInfo';
// import { setSurveyRcmd } from '../../reducers/surveyRcmdReducer';
function SurveyPage3() {
  let { state } = useLocation();

  let { easy, normal, hard } = state;

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // 다이어트 플랜 상태 변경
  let dispatchPlan = (e) => {
    let { id } = e.target;
    dispatch(setDietPlan(Number(id)));
  };

  // 설문 결과 get 요청 + 화면 전환
  let { dietPlan } = useSelector((state) => state.surveyQuestionReducer);

  let nextHandler = () => {
    // let page3Param = `&kcal=${dietPlan}`;
    getData(`/mealboxes/rec/survey/${dietPlan}`).then((res) => {
      console.log(res.data);
    });
    // setSurveyRcmd(data);
    navigate(`/survey/result`);
    dispatch(setReset());
  };

  return (
    <article>
      <SurveyH3>
        밀박스 추천을 위한 <br />
        다이어트 플랜를 선택해주세요.
      </SurveyH3>
      <ExplanationDiv>
        선택한 플랜에 따라 일일 칼로리 및 예상 체중이 조정됩니다.
      </ExplanationDiv>
      <Option>
        <SurveyBox
          id={easy.kcal}
          title="Easy"
          group="plan"
          info={
            <DietInfo
              kcal={easy.kcal}
              weight={easy.goalWeight}
              target={easy.goalWeightLoss}
            />
          }
          changeHandler={dispatchPlan}
          checked={dietPlan === easy.kcal}
        >
          <div>
            다이어트는 너무 길어지면 힘들지만 무작정 빨리갈 수는 없어요.
          </div>
          <div>천천히 목표를 향해 나아가보아요.</div>
        </SurveyBox>
        <SurveyBox
          id={normal.kcal}
          title="Normal"
          group="plan"
          info={
            <DietInfo
              kcal={normal.kcal}
              weight={normal.goalWeight}
              target={normal.goalWeightLoss}
            />
          }
          changeHandler={dispatchPlan}
          checked={dietPlan === normal.kcal}
        >
          <div>
            이왕 다이어트를 하는거라면 조금은 도전적인 선택도 좋을거예요!
          </div>
        </SurveyBox>
        <SurveyBox
          id={hard.kcal}
          title="Hard"
          group="plan"
          info={
            <DietInfo
              kcal={hard.kcal}
              weight={hard.goalWeight}
              target={hard.goalWeightLoss}
            />
          }
          changeHandler={dispatchPlan}
          checked={dietPlan === hard.kcal}
        >
          <div>
            다이어트에 대한 강한 의지나 다가오는 중요한 일정이 있으신가요?
          </div>
          <div>강도가 높아 지키기 힘들 수도 있어요.</div>
        </SurveyBox>
      </Option>
      <PreAndNextButtons nextHandler={nextHandler} />
    </article>
  );
}

export default SurveyPage3;
