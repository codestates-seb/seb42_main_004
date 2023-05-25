import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../reducers/surveyQuestionReducer';
import getData from '../../util/getData';
import styled from 'styled-components';
import PreAndNextButtons from './PreAndNextButtons';
import SurveyBox from './SurveyBox';
import { SurveyH3 } from './SurveyPage1';

function SurveyPage2({ name }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // 활동량 상태 변경
  let dispatchActive = (e) => {
    dispatch(setActive(e.target.id));
  };

  // 다이어트 플랜 get 요청 + 화면 전환
  let { age, gender, height, weight, active } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  let nextHandler = () => {
    let page2Param = `?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activityAmount=${active}`;
    getData(`/survey${page2Param}`).then((res) => {
      navigate(`/survey/question/3`, { state: res.data });
    });
  };

  let explanation = {
    NOT_ACTIVE: { active: '비활동적', detail: '대부분 앉아있는 직장인 등' },
    LOW_ACTIVE: { active: '저활동적', detail: '주 1~3회 가벼운 운동' },
    NORMAL_ACTIVE: {
      active: '활동적',
      detail: '매일 30분 이상 자발적 운동',
    },
    HIGH_ACTIVE: {
      active: '매우 활동적',
      detail: '주로 선수, 거의 매일 2회 운동',
    },
  };

  let optionItem = Object.keys(explanation).map((act) => {
    return (
      <SurveyBox
        key={act}
        id={act}
        title={explanation[act].active}
        group="active"
        changeHandler={dispatchActive}
        checked={active === act}
      >
        <div>{explanation[act].detail}</div>
      </SurveyBox>
    );
  });

  return (
    <article>
      <SurveyH3>{name ? `${name}님` : `당신의`} 활동량을 알려주세요</SurveyH3>
      <ExplanationDiv>
        정확한 일일 권장 섭취량을 계산하는데 사용됩니다.
      </ExplanationDiv>
      <Option>{optionItem}</Option>
      <PreAndNextButtons nextHandler={nextHandler} />
    </article>
  );
}

export default SurveyPage2;

export const Option = styled.div`
  > * {
    margin-bottom: 5px;
  }
`;

export const ExplanationDiv = styled.div`
  font-size: 1.1rem;
  margin-bottom: 10px;
`;
