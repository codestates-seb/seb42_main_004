import { useParams } from 'react-router-dom';
import { BsFillCircleFill as Dot } from '@react-icons/all-files/bs/BsFillCircleFill.esm';
import styled from 'styled-components';
import SurveyArticle from '../components/survey/SurveyArticle';

function Survey() {
  let { page } = useParams();
  page = Number(page);

  return (
    <Main className="margininside" page={page}>
      <Ul page={page}>
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
      <Article page={page} />
    </Main>
  );
}

export default Survey;

const Main = styled.main`
  height: calc(100vh - 115px);
  width: 600px;
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
    color: var(--bucket_brown_070);

    :nth-child(${(props) => props.page}) {
      color: var(--signature);
    }
  }
`;
