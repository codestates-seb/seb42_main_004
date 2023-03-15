import styled from 'styled-components';
import MainButton from '../commons/MainButton';
import blankbucket from '../../assets/blankbucket.png';

function MealBoxCardDiv({ mealBox, custom }) {
  return (
    <MealBoxCardContainerDiv className="shadow">
      <MealBoxImgDiv className="shadow">
        {mealBox && (
          <p>
            <span>500g</span>
            <span>500kcal</span>
          </p>
        )}
        <MealBoxImg
          alt=""
          src={
            custom
              ? blankbucket
              : 'https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2022/06/%EC%8B%A0%EC%84%B8%EA%B3%84%ED%91%B8%EB%93%9C_%EB%B3%B8%EB%AC%B8-1.jpg'
          }
        />
        {mealBox && (
          <MealBoxDesUl>
            <li>
              <span>케일주스</span>
              <span>100ml</span>
              <span>100kcal</span>
            </li>
          </MealBoxDesUl>
        )}
      </MealBoxImgDiv>
      <MealBoxH3 custom={custom && 1}>
        {custom ? '커스텀 밀박스 만들기' : '밀박스A'}
      </MealBoxH3>
      <MealBoxCardButtonDiv custom={custom && 1}>
        <MainButton name="커스텀 하기" />
        {!custom && (
          <>
            <MainButton name="장바구니 추가" />
            <MainButton name="가격" />
          </>
        )}
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
  padding: 2rem;
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
  opacity: 0;

  > li {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  :hover {
    opacity: 1;
  }
`;
const MealBoxH3 = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  text-align: ${(props) => props.custom && 'center'};
`;
const MealBoxCardButtonDiv = styled.div`
  display: ${(props) => (props.custom ? 'flex' : 'grid')};
  grid-template-columns: repeat(3, auto);
  column-gap: 0.5rem;
  width: 100%;

  > button {
    font-size: 1rem !important;
    width: 100%;
    padding: 0.7rem;
    height: auto;
    max-height: 3.5rem;
    word-break: keep-all;
  }

  button:nth-child(3) {
    cursor: default;

    :active {
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
    }
  }
`;
