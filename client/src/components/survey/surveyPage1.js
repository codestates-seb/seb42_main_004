import styled from 'styled-components';
import InputLabelDiv from '../commons/InputLabelDiv';
import MainButton from '../commons/MainButton';
import PreAndNextButtons from './preAndNextButtons';

function SurveyPage1() {
  let maleHandler = (e) => {
    console.log(e.target);
  };

  let femaleHandler = (e) => {
    console.log(e.target);
  };

  return (
    <Article>
      <H3>밀박스 추천을 위해 정보를 입력해주세요.</H3>
      <SurveyContentDiv>
        <InputLabelDiv
          label="생년월일"
          id="name"
          // value={productInfo.name}
          // onChange={inputHandler('name')}
          placeholder="2000.01.01"
        />
        <div>
          <div>성별</div>
          <GenderOptionDiv>
            <MainButton name="남성" handler={maleHandler} />
            <MainButton name="여성" handler={femaleHandler} />
          </GenderOptionDiv>
        </div>
        <InputLabelDiv
          label="신장"
          id="name"
          value=""
          placeholder="0"
          unit="cm"
        />
        <InputLabelDiv
          label="체중"
          id="name"
          value=""
          placeholder="0"
          unit="kg"
        />
        <PreAndNextButtons />
      </SurveyContentDiv>
    </Article>
  );
}

export default SurveyPage1;

const Article = styled.article`
  flex-direction: column;
`;

const H3 = styled.h3`
  margin-bottom: 0.5rem;
`;

const SurveyContentDiv = styled.div`
  width: 200px;
  margin: 0 auto;
`;

const GenderOptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;
