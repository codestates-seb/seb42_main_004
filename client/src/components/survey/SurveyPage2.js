import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../reducers/surveyQuestionReducer';
import getData from '../../util/getData';
import styled from 'styled-components';
import PreAndNextButtons from './PreAndNextButtons';
import SurveyBox from './SurveyBox';
import { SurveyH3 } from './SurveyPage1';

function SurveyPage2({ name = '맹쥬' }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // 활동량 상태 변경
  let dispatchActive = (e) => {
    let { id } = e.target;
    dispatch(setActive(id));
  };

  // 다이어트 플랜 get 요청 + 화면 전환
  let { age, gender, height, weight, active } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  let nextHandler = () => {
    let page2Param = `?age=${age}&gender=${gender}&height=${height}&weight=${weight}&activityAmount=${active}`;
    getData(`/survey${page2Param}`).then((res) => {
      navigate(`/survey/question/3`, { state: res.data });
      console.log(res.data);
    });
  };

  return (
    <article>
      <SurveyH3>{name}님의 활동량을 알려주세요</SurveyH3>
      <ExplanationDiv>
        정확한 일일 권장 섭취량을 계산하는데 사용됩니다.
      </ExplanationDiv>
      <Option>
        <SurveyBox
          id="NOT_ACTIVE"
          title="비활동적"
          group="active"
          detail="대부분 앉아있는 직장인 등"
          changeHandler={dispatchActive}
          checked={active === 'NOT_ACTIVE'}
        />
        <SurveyBox
          id="LOW_ACTIVE"
          title="저활동적"
          group="active"
          detail="주 1~3회 가벼운 운동"
          changeHandler={dispatchActive}
          checked={active === 'LOW_ACTIVE'}
        />
        <SurveyBox
          id="NORMAL_ACTIVE"
          title="활동적"
          group="active"
          detail="매일 30분 이상 자발적 운동"
          changeHandler={dispatchActive}
          checked={active === 'NORMAL_ACTIVE'}
        />
        <SurveyBox
          id="HIGH_ACTIVE"
          title="매우 활동적"
          group="active"
          detail="주로 선수, 거의 매일 2회 운동"
          changeHandler={dispatchActive}
          checked={active === 'HIGH_ACTIVE'}
        />
      </Option>
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
