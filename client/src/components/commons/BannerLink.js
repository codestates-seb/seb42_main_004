import { Link } from 'react-router-dom';
import styled from 'styled-components';

function BannerLink() {
  return (
    <BannerContainerLink className="shadow" to="/survey/question/1">
      다이어트용 밀박스를 추천 받으시겠습니까?
    </BannerContainerLink>
  );
}

export default BannerLink;

const BannerContainerLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 29;
  position: sticky;
  width: 100vw;
  height: 50px;
  top: 50px;
  left: 0;
  background-color: var(--signature);
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.1rem;
  color: var(--white);
  text-decoration: none;
  text-align: center;
  margin: -1rem -50vw 1rem;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;
