import PreAndNextButtons from './PreAndNextButtons';
import SurveyBox from './SurveyBox';

function SurveyPage2({ name = '맹쥬' }) {
  return (
    <article>
      <h3>{name}님의 활동량을 알려주세요</h3>
      <div>정확한 일일 권장 섭취량을 계산하는데 사용됩니다.</div>
      <div>
        <SurveyBox title="비활동적" detail="대부분 앉아있는 직장인 등" />
        <SurveyBox title="저활동적" detail="주 1~3회 가벼운 운동" />
        <SurveyBox title="활동적" detail="매일 30분 이상 자발적 운동" />
        <SurveyBox title="매우 활동적" detail="주로 선수, 거의 매일 2회 운동" />
      </div>
      <PreAndNextButtons />
    </article>
  );
}

export default SurveyPage2;
