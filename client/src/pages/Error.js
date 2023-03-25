import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HelmetTitle from '../components/commons/HelmetTitle';
import checkFooter from '../util/checkFooter';

function Error() {
  return (
    <ErrorBaseDiv className="margininside" fullh={checkFooter() ? 1 : null}>
      <HelmetTitle title="에러" />
      <ErrorWrapDiv>
        <h1 className="errorstyle">
          404
          <br />
          Page Not Found
        </h1>
        <Link to="/mealboxes" className="linkstyle">
          메인으로 돌아가기
        </Link>
      </ErrorWrapDiv>
    </ErrorBaseDiv>
  );
}

export default Error;

export const ErrorBaseDiv = styled.div`
  margin: -1rem 0 -4rem;
  height: calc(100vh - 330px);

  @media screen and (max-width: 768px) {
    height: calc(100vh - 280px);
  }

  @media screen and (max-width: 480px) {
    height: calc(
      ${(props) => (props.fullh ? '100vh - 50px' : '100vh - 230px')}
    );
    margin-bottom: ${(props) => props.fullh && '-76px'};
  }
`;
const ErrorWrapDiv = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  min-width: 360px;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--gray_070);
  font-weight: bold !important;

  > h1 {
    font-weight: bold;
    text-align: center;
  }

  > a {
    text-decoration: none;
  }
`;
