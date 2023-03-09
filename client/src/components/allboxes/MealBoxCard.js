import { useState } from 'react';
import styled from 'styled-components';

function MealBoxCard() {
  const [showDes, setShowDes] = useState(false);

  return (
    <MealBoxCardLi className="shadow">
      <MealBoxImgUlDiv
        className="shadow"
        showDes={showDes && 1}
        onClick={() => setShowDes(!showDes)}
      >
        {showDes ? (
          <MealBoxDesUl>
            <li>
              <span>케일주스</span>
              <span>100ml</span>
            </li>
          </MealBoxDesUl>
        ) : (
          <MealBoxImg
            alt=""
            src="https://www.shinsegaegroupnewsroom.com/wp-content/uploads/2022/06/%EC%8B%A0%EC%84%B8%EA%B3%84%ED%91%B8%EB%93%9C_%EB%B3%B8%EB%AC%B8-1.jpg"
          />
        )}
      </MealBoxImgUlDiv>
      <MealBoxH3>{'밀박스A'}</MealBoxH3>
      <div>
        <Button>커스텀하기</Button>
        <Button>장바구니 추가</Button>
        <Button>가격</Button>
      </div>
    </MealBoxCardLi>
  );
}

export default MealBoxCard;

const MealBoxCardLi = styled.li`
  display: inline-flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 5%;
  background-color: var(--head_brown);
`;
const MealBoxImgUlDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(${(props) => (props.showDes ? '--gray' : '--white')});
  padding-bottom: 100%;
`;
const MealBoxImg = styled.img`
  max-width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: auto;
`;
const MealBoxDesUl = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 80%;
  max-height: 100%;
  border-radius: 4px;
  margin: 0 10%;

  > li {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const MealBoxH3 = styled.h3`
  font-size: 1.3rem;
`;
const Button = styled.button`
  border: none;
`;
