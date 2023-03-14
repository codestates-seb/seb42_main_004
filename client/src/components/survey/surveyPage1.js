import styled from 'styled-components';
import InputLabelDiv from '../commons/InputLabelDiv';
import { Link } from 'react-router-dom';

function SurveyPage1() {
  return (
    <Article>
      <InputLabelDiv
        label="생년월일"
        id="name"
        value=""
        placeholder="example@email.com"
      />
      <InputLabelDiv label="신장" id="name" value="" placeholder="0" />
      <InputLabelDiv label="체중" id="name" value="" placeholder="0" />
      <Link to="/survey/2">링크링</Link>
    </Article>
  );
}

export default SurveyPage1;

const Article = styled.article`
  flex-direction: column;
`;
