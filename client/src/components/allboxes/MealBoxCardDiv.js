import { useState } from 'react';
import styled from 'styled-components';
import MainButton from '../commons/MainButton';

function MealBoxCardDiv() {
  const [showDes, setShowDes] = useState(false);

  return (
    <MealBoxCardContainerDiv className="shadow">
      <MealBoxImgDiv
        className="shadow"
        // showDes={showDes && 1}
        onClick={() => setShowDes(!showDes)}
      >
        <p>
          <span>500g</span>
          <span>500kcal</span>
        </p>
        <MealBoxImg
          alt=""
          src="https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2022/06/%EC%8B%A0%EC%84%B8%EA%B3%84%ED%91%B8%EB%93%9C_%EB%B3%B8%EB%AC%B8-1.jpg"
        />
        {showDes && (
          <MealBoxDesUl>
            <li>
              <span>케일주스</span>
              <span>100ml</span>
              <span>100kcal</span>
            </li>
          </MealBoxDesUl>
        )}
      </MealBoxImgDiv>
      <MealBoxH3>{'밀박스A'}</MealBoxH3>
      <MealBoxCardButtonDiv>
        <MainButton name="커스텀 하기" />
        <MainButton name="장바구니 추가" />
        <MainButton name="가격" />
      </MealBoxCardButtonDiv>
    </MealBoxCardContainerDiv>
  );
}

export default MealBoxCardDiv;

export const MealBoxCardContainerDiv = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 5%;
  background-color: var(--head_brown);
`;
const MealBoxImgDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(--white);
  padding-bottom: 100%;
  cursor: pointer;

  > p {
    z-index: 10;
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;

    > span {
      font-size: 0.8rem;
      margin-right: 0.5rem;
    }
  }
`;
const MealBoxImg = styled.img`
  max-width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: auto;
`;
const MealBoxDesUl = styled.ul`
  z-index: 9;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: var(--gray_070);
  display: flex;
  align-items: center;
  padding: 0 7.5%;

  > li {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const MealBoxH3 = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;
const MealBoxCardButtonDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 0.5rem;

  > button {
    font-size: 1rem !important;
    width: 100%;
    padding: 0.7rem;
    height: auto;
    max-height: 3.5rem;
    word-break: keep-all;
  }
`;
