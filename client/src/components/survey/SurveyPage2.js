import styled from 'styled-components';
import PreAndNextButtons from '../PreAndNextButtons';
import SurveyBox from './SurveyBox';
import { SurveyH3 } from './SurveyPage1';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../reducers/surveyQuestionReducer';
import getData from '../../util/getData';

function SurveyPage2({ name = '맹쥬' }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let api = `${process.env.REACT_APP_API_URL}`;
  console.log(api);

  let { age, gender, height, weight } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  let nextHandler = () => {
    let activeValue = document.querySelector('input[name="page2"]:checked')?.id;

    dispatch(setActive(activeValue));

    let page2Param = `?age=${age}&gender=${gender}&height=${height}&weight=${weight}&active=${activeValue}`;

    let data = getData(api + page2Param);
    navigate(`/survey/result`, data);
  };

  return (
    <article>
      <SurveyH3>{name}님의 활동량을 알려주세요</SurveyH3>
      <ExplanationDiv>
        정확한 일일 권장 섭취량을 계산하는데 사용됩니다.
      </ExplanationDiv>
      <Option>
        <SurveyBox
          group="page2"
          title="비활동적"
          detail="대부분 앉아있는 직장인 등"
        />
        <SurveyBox
          group="page2"
          title="저활동적"
          detail="주 1~3회 가벼운 운동"
        />
        <SurveyBox
          group="page2"
          title="활동적"
          detail="매일 30분 이상 자발적 운동"
        />
        <SurveyBox
          group="page2"
          title="매우 활동적"
          detail="주로 선수, 거의 매일 2회 운동"
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
