import styled from 'styled-components';

function SurveyBox({ title, info, detail }) {
  return (
    <SurveyBoxWrapper>
      <BoxTop>
        <h3>{title}</h3>
        {info}
      </BoxTop>
      <div>{detail}</div>
    </SurveyBoxWrapper>
  );
}

export default SurveyBox;

const SurveyBoxWrapper = styled.div`
  background-color: var(--product_cocoa);
  border-radius: 10px;
  padding: 10px;
`;

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
