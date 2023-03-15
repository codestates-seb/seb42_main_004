import DietInfo from './DietInfo';
import PreAndNextButtons from './PreAndNextButtons';
import SurveyBox from './SurveyBox';

function SurveyPage3() {
  return (
    <article>
      <h3>밀박스 추천을 위한 다이어트 플랜를 선택해주세요.</h3>
      <div>선택한 플랜에 따라 일일 칼로리 및 예상 체중이 조정됩니다.</div>
      <div>
        <SurveyBox
          title="Easy"
          info={<DietInfo kcal="1600" weight="00.0kg" target="1.6" />}
          detail="다이어트는 너무 길어지면 힘들지만 무작정 빨리갈 수는 없어요. 천천히 목표를 향해 나아가보아요."
        />
        <SurveyBox
          title="Normal"
          info={<DietInfo kcal="1200" weight="00.0kg" target="2.1" />}
          detail="다이어트는 너무 길어지면 힘들지만 무작정 빨리갈 수는 없어요. 천천히 목표를 향해 나아가보아요."
        />
        <SurveyBox
          title="Hard"
          info={<DietInfo kcal="800" weight="00.0kg" target="2.9" />}
          detail="다이어트는 너무 길어지면 힘들지만 무작정 빨리갈 수는 없어요. 천천히 목표를 향해 나아가보아요."
        />
      </div>
      <PreAndNextButtons />
    </article>
  );
}

export default SurveyPage3;
