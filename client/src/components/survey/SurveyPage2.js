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
  let dispatchActive = () => {
    dispatch(
      setActive(document.querySelector('input[name="active"]:checked')?.id)
    );
  };

  // 다이어트 플랜 get 요청 + 화면 전환
  let { age, gender, height, weight, active } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  let api = `${process.env.REACT_APP_API_URL}`;

  let nextHandler = () => {
    let page2Param = `?age=${age}&gender=${gender}&height=${height}&weight=${weight}&active=${active}`;
    let data = getData(api + page2Param);
    navigate(`/survey/question/3`, data);
  };

  return (
    <article>
      <SurveyH3>{name}님의 활동량을 알려주세요</SurveyH3>
      <ExplanationDiv>
        정확한 일일 권장 섭취량을 계산하는데 사용됩니다.
      </ExplanationDiv>
      <Option>
        <SurveyBox
          group="active"
          title="비활동적"
          detail="대부분 앉아있는 직장인 등"
          changeHandler={dispatchActive}
        />
        <SurveyBox
          group="active"
          title="저활동적"
          detail="주 1~3회 가벼운 운동"
          changeHandler={dispatchActive}
        />
        <SurveyBox
          group="active"
          title="활동적"
          detail="매일 30분 이상 자발적 운동"
          changeHandler={dispatchActive}
        />
        <SurveyBox
          group="active"
          title="매우"
          detail="주로 선수, 거의 매일 2회 운동"
          changeHandler={dispatchActive}
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
