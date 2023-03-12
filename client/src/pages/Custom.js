import styled from 'styled-components';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import { MealBoxesWrapDiv } from './AllBoxes';

function Custom() {
  return (
    <MealBoxesWrapDiv className="margininside">
      <h1>커스텀 밀박스</h1>
      <CustomSelectDiv>
        <BoxElementsUl>
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
          <li>
            <BoxElementCardDiv />
          </li>
        </BoxElementsUl>
        <ElementsInBucketAside>
          <Div>
            <h2>Custom</h2>
            <ul>
              <li>
                <span>{`${'오렌지주스'} ${1}`}</span>
                <button>&#10005;</button>
              </li>
              <li>
                <span>{`${'오렌지주스'} ${1}`}</span>
                <button>&#10005;</button>
              </li>
            </ul>
            <div>
              <span>합계</span>
              <span>{`${'19,900'}원`}</span>
            </div>
          </Div>
          <AsideSignatureButton>장바구니 담기</AsideSignatureButton>
        </ElementsInBucketAside>
      </CustomSelectDiv>
    </MealBoxesWrapDiv>
  );
}

export default Custom;

const BoxElementsUl = styled.ul`
  list-style: none;
  width: 60%;

  float: left;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;

  /* @media (max-width: 768px) {
    flex-direction: column;
  } */
`;

const Div = styled.div`
  padding: 1rem;

  h2 {
    color: var(--white);
  }

  li,
  div {
    display: flex;
    justify-content: space-between;
  }

  div {
    margin-top: 1rem;
    margin-bottom: -1rem;
    font-weight: bold;
  }

  button {
    border: none;
    background-color: inherit;
    font-weight: bold;
    color: var(--white);
  }
`;

export const ElementsInBucketAside = styled.aside`
  float: right;
  position: sticky;
  top: calc(70px + 2rem);

  min-width: 30%;
  height: fit-content;
  border-radius: 10px;
  background-color: var(--bucket_brown);
  box-shadow: 0 0 0 2px var(--bucket_brown) inset,
    2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    > div {
      display: none;
    }
  }

  /* @media (max-width: 768px) {
    z-index: 999;
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    margin: 0 -16px;
  } */
`;
export const AsideSignatureButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem 0;
  font-weight: bold;
  background-color: var(--signature);
  border-radius: 0 0 10px 10px;
`;
