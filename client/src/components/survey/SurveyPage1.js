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
  let [ageValidMsg, setAgeValidMsg] = useState('');
  let [weightValidMsg, setWeightValidMsg] = useState('');
  let [heightValidMsg, setHeightValid] = useState('');

  let { age, height, weight, gender } = useSelector(
    (state) => state.surveyQuestionReducer
  );

  let dispatchProfile = (e) => {
    let { id, value } = e.target;

    let regexAge = new RegExp(/^\d*?$/);
    let regexHW = new RegExp(/^\d*(\.\d{0,1})?$/);
    let regex = id === 'age' ? regexAge : regexHW;

    if (regex.test(value)) {
      dispatch(setProfile({ id, value }));
    }
  };

  let dispatchGender = (e) => {
    const { id } = e.target;
    dispatch(setGender(id));
  };

  let nextHandler = () => {
    if (checkValid()) {
      navigate(`/survey/question/2`);
    }
  };

  let checkValid = () => {
    let ageValid = age > 0 && age <= 100;
    let heightValid = height >= 120 && height <= 220;
    let weightValid = weight >= 20 && weight <= 150;

    if (!ageValid) {
      setAgeValidMsg('1에서 100 사이의 값을 입력해주세요.');
    }
    if (!heightValid) {
      setHeightValid('120에서 220 사이의 값을 입력해주세요.');
    }
    if (!weightValid) {
      setWeightValidMsg('20에서 150 사이의 값을 입력해주세요.');
    }
    return ageValid && heightValid && weightValid;
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
        <ValidMsg>{ageValidMsg}</ValidMsg>
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
          placeholder="000.0"
          unit="cm"
          maxLength="5"
        />
        <ValidMsg>{heightValidMsg}</ValidMsg>
        <InputLabelDiv
          label="체중"
          id="weight"
          value={weight}
          onChange={dispatchProfile}
          placeholder="00.0"
          unit="kg"
          maxLength="5"
        />
        <ValidMsg>{weightValidMsg}</ValidMsg>
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
