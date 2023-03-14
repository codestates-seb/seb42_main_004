import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoWhite from '../../assets/logo_white.png';

function SurveyPage0() {
  return (
    <Article>
      <section>
        <LogoImg src={LogoWhite} alt="logo" />
        <div>
          <span>당신의 소중한 시간과</span>
          <span>건강을 위한 밀박스</span>
        </div>
      </section>
      <BottomSection>
        <div>다이어트용 밀박스를</div>
        <div>추천 받으시겠습니까?</div>
        <Link to="/">추천 받기</Link>
        <Link to="/">건너뛰기</Link>
      </BottomSection>
    </Article>
  );
}

export default SurveyPage0;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-width: 360px;
  width: 100vw;
  height: 60vh;
  background-color: var(--signature);
  color: var(--white);

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

const BottomSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  > *:not(:first-child) {
    margin: 0.3rem 0;
  }
`;
