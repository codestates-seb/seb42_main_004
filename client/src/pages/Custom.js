import styled from 'styled-components';
import PaginationUl from '../components/commons/PaginationUl';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
import CartAside from '../components/commons/CartAside';
// import ModalDiv from '../components/commons/ModalDiv';

function Custom() {
  return (
    <MealBoxesWrapDiv className="margininside">
      {/* <ModalDiv /> */}
      <h1>커스텀 밀박스</h1>
      <CustomSelectDiv>
        <ElementsContainerDiv>
          <ul>
            <li>
              <BoxElementCardDiv />
            </li>
            <li>
              <BoxElementCardDiv />
            </li>
            <li>
              <BoxElementCardDiv />
            </li>
            <li>
              <BoxElementCardDiv />
            </li>
            <li>
              <BoxElementCardDiv />
            </li>
            <li>
              <BoxElementCardDiv />
            </li>
          </ul>
          <PaginationUl nowpage={1} totalpage={1} />
        </ElementsContainerDiv>
        <CartAside
          open={<TriangleDiv />}
          type="custom"
          inDiv={
            <>
              <InAsideH2>Custom</InAsideH2>
              <InAsideUl>
                <ElementInBucketLi>
                  <span>{`${'오렌지주스'}`}</span>
                  <span>
                    {`${1}`}
                    <button>&#10005;</button>
                  </span>
                </ElementInBucketLi>
                <ElementInBucketLi>
                  <span>{`${'오렌지주스'}`}</span>
                  <span>
                    {`${1}`}
                    <button className="linkstyle">&#10005;</button>
                  </span>
                </ElementInBucketLi>
              </InAsideUl>
              <InAsideDiv>
                <span>합계</span>
                <span>{`${'19,900'}원`}</span>
              </InAsideDiv>
            </>
          }
        ></CartAside>
      </CustomSelectDiv>
    </MealBoxesWrapDiv>
  );
}

export default Custom;

const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ElementsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 60%;

  > ul {
    list-style: none;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const TriangleDiv = styled.div`
  display: none;
  width: 0;
  height: 0;
  border-bottom: calc(4px * 1.732) solid var(--bucket_brown);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 480px) {
    display: block;
  }
`;

const InAsideH2 = styled.h2`
  color: var(--white);
  list-style: none;
  min-height: 1vh;

  @media (max-width: 480px) {
    display: none;
  }
`;

const InAsideUl = styled.ul`
  @media (max-width: 480px) {
    display: none;
  }
`;

export const InAsideDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: -0.5rem;
`;

const ElementInBucketLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-size: 0.8rem;
    > button {
      border: none;
      background-color: inherit;
      font-weight: bold;
      /* color: var(--white); */
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    border-radius: 0;
  }
`;
