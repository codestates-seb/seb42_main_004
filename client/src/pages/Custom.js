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
        <AsideWrapper>
          <ShowDetail>
            <Triangle />
            <ElementsInBucketDiv>
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
            </ElementsInBucketDiv>
          </ShowDetail>
          <AsideSignatureButton>장바구니 담기</AsideSignatureButton>
        </AsideWrapper>
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
`;

export const ElementsInBucketDiv = styled.div`
  background-color: var(--bucket_brown);
  padding: 1rem;
  border-radius: 10px 10px 0 0;

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

  @media (max-width: 480px) {
    > h2,
    ul {
      display: none;
    }

    > div {
      margin: 0;
    }
  }

  @media (max-width: 480px) {
    border-radius: 0;
  }
`;
export const AsideSignatureButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem 0;
  font-weight: bold;
  background-color: var(--signature);
  border-radius: 0 0 10px 10px;

  @media (max-width: 480px) {
    border-radius: 0;
  }
`;

const Triangle = styled.div`
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

const AsideWrapper = styled.aside`
  float: right;
  position: sticky;
  top: calc(70px + 2rem);
  min-width: 30%;
  height: fit-content;
  box-shadow: var(--bucket_brown) inset, 2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    z-index: 999;
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    margin: 0 -16px;
  }
`;

const ShowDetail = styled.div`
  :hover {
    h2,
    ul {
      display: block;
    }
  }
`;
