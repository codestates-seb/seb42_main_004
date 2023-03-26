import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputLabelDiv from '../commons/InputLabelDiv';
import PreAndNextButtons from './PreAndNextButtons';
import { setProfile, setGender } from '../../reducers/surveyQuestionReducer';
import SurveyBox from './SurveyBox';
import { useEffect, useState } from 'react';
function SurveyPage1() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [alertMsg, setAlertMsg] = useState('잘못된 입력입니다.');
  let [isValid, setValid] = useState(false);

  let { age, height, weight, gender } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  let dispatchProfile = (e) => {
    let { id, value } = e.target;

    let regex = new RegExp(/^\d*(\.\d{0,1})?$/);
    if (regex.test(value)) {
      dispatch(setProfile({ id, value }));
    }
  };

  let dispatchGender = (e) => {
    const { id } = e.target;
    dispatch(setGender(id));
  };

  let nextHandler = () => {
    if (isValid) {
      navigate(`/survey/question/2`);
    }
  };

  let checkValid = () => {
    let ageValid = age > 0 && age <= 100;
    let heightValid = height > 0 && height <= 200;
    let weightValid = weight > 0 && weight <= 150;

    if (!ageValid) {
      setAlertMsg('나이는 100세 이하여야 합니다.');
    } else if (!heightValid) {
      setAlertMsg('신장은 200cm 이하여야 합니다.');
    } else if (!weightValid) {
      setAlertMsg('체중은 150kg 이하여야 합니다.');
    } else {
      setAlertMsg('');
    }
    ageValid && heightValid && weightValid ? setValid(true) : setValid(false);
  };

  useEffect(() => {
    checkValid();
  }, [age, weight, height]);

  return (
    <Article>
      <SurveyH3>
        밀박스 추천을 위해
        <br />
        정보를 입력해주세요.
      </SurveyH3>
      <SurveyContentDiv>
        <InputLabelDiv
          label="나이"
          id="age"
          value={age}
          onChange={dispatchProfile}
          placeholder="00"
          unit="세"
          maxLength="3"
        />
        <div>
          <div>성별</div>
          <GenderOptionDiv>
            <SurveyBox
              id="MALE"
              title="남성"
              group="gender"
              changeHandler={dispatchGender}
              checked={gender === 'MALE'}
            />
            <SurveyBox
              id="FEMALE"
              title="여성"
              group="gender"
              changeHandler={dispatchGender}
              checked={gender === 'FEMALE'}
            />
          </GenderOptionDiv>
        </div>
        <InputLabelDiv
          label="신장"
          id="height"
          value={height}
          onChange={dispatchProfile}
          placeholder="0"
          unit="cm"
          maxLength="3"
        />
        <InputLabelDiv
          label="체중"
          id="weight"
          value={weight}
          onChange={dispatchProfile}
          placeholder="00.0"
          unit="kg"
          maxLength="4"
        />
        <ValidMsg>{alertMsg}</ValidMsg>
        <PreAndNextButtons nextHandler={nextHandler} />
      </SurveyContentDiv>
    </Article>
  );
}

export default SurveyPage1;

const Article = styled.article`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
`;

export const SurveyH3 = styled.h3`
  margin-bottom: 1rem;
  white-space: nowrap;
  font-size: 1.8rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
`;

const SurveyContentDiv = styled.div`
  > div:last-child {
    margin-top: 20px;
  }

  label,
  > div > div:first-child {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 15px;
    font-size: medium;
  }

  span {
    margin-right: 15px;
    font-size: medium;
  }
`;

const GenderOptionDiv = styled.div`
  display: flex;
  justify-content: space-between;

  > * {
    flex-grow: 1;

    :first-child {
      margin-right: 5px;
    }
    :last-child {
      margin-left: 5px;
    }

    > div {
      margin: 0;

      > h3 {
        margin: 0 auto;
      }
    }
  }
`;

const ValidMsg = styled.div`
  color: #d84b4b;
`;
