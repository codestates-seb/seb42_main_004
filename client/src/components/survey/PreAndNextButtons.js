import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../commons/MainButton';
import { useSelector, useDispatch } from 'react-redux';
import { setActive } from '../../reducers/surveyQuestionReducer';
function PreAndNextButtons() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { page } = useParams();
  page = Number(page);

  const { age, gender, height, weight, active } = useSelector(
    (state) => state.surveyQuestionReducer
  );
  console.log(age, gender, height, weight, active);

  let preHandler = () => {
    navigate(`/survey/question/${page - 1}`);
  };

  let nextHandler = () => {
    let url = `/survey/question/${page + 1}`;

    if (page === 1) {
      url += `?age=${age}&gender=${gender}&height=${height}&weight=${weight}`;
    }

    if (page === 2) {
      let activeValue = document.querySelector(
        'input[name="page2"]:checked'
      )?.id;

      dispatch(setActive(activeValue));

      url += `?age=${age}&gender=${gender}&height=${height}&weight=${weight}&active=${activeValue}`;
    }

    navigate(url);
  };

  return (
    <ButtonWrapperDiv>
      <MainButton name="이전" handler={preHandler} />
      <MainButton name={page !== 3 ? '다음' : '완료'} handler={nextHandler} />
    </ButtonWrapperDiv>
  );
}

export default PreAndNextButtons;

const ButtonWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    flex-grow: 1;
    padding: 30px 0;

    :first-child {
      margin-right: 5px;
    }
    :last-child {
      margin-left: 5px;
    }
  }
`;
