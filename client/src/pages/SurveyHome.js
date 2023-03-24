import styled from 'styled-components';
import SurveyHomeArticle from '../components/survey/SurveyHomeArticle';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
function SurveyHome() {
  let { isLogin, admin } = useSelector((state) => state.authReducer);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin || admin) navigate('/mealboxes');
    console.log(isLogin, admin);
  }, []);

  return (
    <Main>
      <SurveyHomeArticle />
    </Main>
  );
}

export default SurveyHome;

const Main = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media (max-width: 480px) {
  }
`;
