import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components';

function SurveyBox({ group, title, info, detail, children, changeHandler }) {
  let { gender, active, dietPlan } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  useEffect(() => {
    let id;
    if (group === 'gender') {
      id = gender || '남성';
    } else if (group === 'active') {
      id = active || '비활동적';
    } else if (group === 'plan') {
      id = dietPlan || 'Easy';
    }

    let defaultValue = document.querySelector(`#${id}`);
    defaultValue.checked = true;
  }, []);

  return (
    <>
      <Input type="radio" name={group} id={title} onChange={changeHandler} />
      <SurveyBoxLabel htmlFor={title}>
        <BoxTop>
          <h3>{title === '매우' ? title + ' 활동적' : title}</h3>
          {info}
        </BoxTop>
        <div>{detail ? detail : children}</div>
      </SurveyBoxLabel>
    </>
  );
}

export default SurveyBox;

const SurveyBoxLabel = styled.label`
  display: block;
  background-color: var(--product_cocoa);
  border-radius: 10px;
  padding: 15px;

  :hover {
    background-color: var(--bucket_brown_070);
  }
`;

const Input = styled.input`
  position: absolute;
  /* z-index: -999; */
  :checked + label {
    background-color: var(--signature);
    color: var(--white);
  }
`;

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > h3 {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.4rem;
  }
`;
