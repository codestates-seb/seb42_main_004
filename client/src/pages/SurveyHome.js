import styled from 'styled-components';
import SurveyHomeArticle from '../components/survey/SurveyHomeArticle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function SurveyHome() {
  let navigate = useNavigate();
  let isLogin = false;

  useEffect(() => {
    if (isLogin) navigate('/boxes');
  }, []);

  return (
    <Main>
      <SurveyHomeArticle />
    </Main>
  );
}

export default SurveyHome;

const Main = styled.main`
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
