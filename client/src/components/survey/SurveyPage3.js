import DietInfo from './DietInfo';
import PreAndNextButtons from './PreAndNextButtons';
import SurveyBox from './SurveyBox';
import { Option, ExplanationDiv } from './SurveyPage2';
import { SurveyH3 } from './SurveyPage1';
// import { useEffect } from 'react';
// import getData from '../../util/getData';

function SurveyPage3() {
  console.log(window.location.href);

  let api = `${process.env.REACT_APP_API_URL}`;
  console.log(api);

  // useEffect(() => {
  //   getData(api + ``);
  // }, []);

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
          group="page3"
          title="Easy"
          info={<DietInfo kcal="1600" weight="00.0kg" target="1.6" />}
        >
          <div>
            다이어트는 너무 길어지면 힘들지만 무작정 빨리갈 수는 없어요.
          </div>
          <div>천천히 목표를 향해 나아가보아요.</div>
        </SurveyBox>
        <SurveyBox
          group="page3"
          title="Normal"
          info={<DietInfo kcal="1200" weight="00.0kg" target="2.1" />}
        >
          <div>
            이왕 다이어트를 하는거라면 조금은 도전적인 선택도 좋을거예요!
          </div>
        </SurveyBox>
        <SurveyBox
          group="page3"
          title="Hard"
          info={<DietInfo kcal="800" weight="00.0kg" target="2.9" />}
        >
          <div>
            다이어트에 대한 강한 의지나 다가오는 중요한 일정이 있으신가요?
          </div>
          <div>강도가 높아 지키기 힘들 수도 있어요.</div>
        </SurveyBox>
      </Option>
      <PreAndNextButtons />
    </article>
  );
}

export default SurveyPage3;
