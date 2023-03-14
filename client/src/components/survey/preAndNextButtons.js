import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from '../commons/MainButton';

function PreAndNextButtons() {
  let { page } = useParams();
  page = Number(page);

  let navigate = useNavigate();

  let preHandler = () => {
    navigate(`/survey/${page - 1}`);
  };

  let nextHandler = () => {
    navigate(`/survey/${page + 1}`);
  };

  return (
    <ButtonWrapperDiv>
      <MainButton name="이전" handler={preHandler} />
      <MainButton name="다음" handler={nextHandler} />
    </ButtonWrapperDiv>
  );
}

export default PreAndNextButtons;

const ButtonWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
