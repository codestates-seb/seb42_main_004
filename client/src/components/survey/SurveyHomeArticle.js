import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoWhite from '../../assets/logo_white.png';
import MainButton from '../commons/MainButton';
function SurveyHomeArticle() {
  return (
    <Article>
      <TopSection>
        <LogoImg src={LogoWhite} alt="logo" />
        <div>
          <span>당신의 소중한 시간과 </span>
          <span>건강을 위한 밀박스</span>
        </div>
      </TopSection>
      <BottomSection>
        <div>다이어트용 밀박스를</div>
        <div>추천받으시겠습니까?</div>
        <SurveyLink name="추천받기" url="/survey/question/1" />
        <SkipLink to="/mealboxes">건너뛰기</SkipLink>
      </BottomSection>
    </Article>
  );
}

export default SurveyHomeArticle;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-width: 360px;
  height: 60vh;
  background-color: var(--signature);
  color: var(--white);
  width: 100%;

  span,
  div {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    height: 100vh;
  }
`;

const LogoImg = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
`;

const TopSection = styled.section``;

const BottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    margin: 30px 0 25px;
  }

  > a {
    color: var(--white);
  }
`;

const SurveyLink = styled(MainButton)``;

const SkipLink = styled(Link)`
  text-decoration: none;
`;
