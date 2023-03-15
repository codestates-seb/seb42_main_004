import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SurveyArticle from '../components/survey/SurveyArticle';
import { BsFillCircleFill as Dot } from 'react-icons/bs';

function Survey() {
  let { page } = useParams();
  return (
    <Main className={page !== '0' ? 'margininside' : null}>
      {page !== '0' ? (
        <Ul>
          <li>
            <Dot size="7" />
          </li>
          <li>
            <Dot size="7" />
          </li>
          <li>
            <Dot size="7" />
          </li>
        </Ul>
      ) : null}
      <Article page={page} />
    </Main>
  );
}

export default Survey;

const Main = styled.main`
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Article = styled(SurveyArticle)``;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  > li {
    margin: 2px;
  }
`;
