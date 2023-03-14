import styled from 'styled-components';
import { MealBoxCardContainerDiv } from '../allboxes/MealBoxCardDiv';

function BoxElementCardDiv() {
  return (
    <BoxElementContainerDiv className="shadow">
      <BoxElementImg
        alt=""
        src="https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444648_20211125135829503.png"
      />
      <BoxElementInfoDiv>
        <h3>오렌지 주스</h3>
        <BoxElementDetailDiv>
          <span>9,999g</span>
          <span>9,999kcal</span>
          <span>99,999원</span>
        </BoxElementDetailDiv>
      </BoxElementInfoDiv>
      <BoxElementButtonDiv>
        <button className="linkstyle">&#8722;</button>
        <span>1</span>
        <button className="linkstyle">&#43;</button>
      </BoxElementButtonDiv>
    </BoxElementContainerDiv>
  );
}

export default BoxElementCardDiv;

const BoxElementContainerDiv = styled(MealBoxCardContainerDiv)`
  flex-direction: row;
  padding: 5px 3%;
  margin-bottom: 10px;
  background-color: var(
    ${(props) => (props.quantity ? '--bucket_brown' : '--product_cocoa')}
  );
  align-items: center;
  justify-content: space-between;
`;
const BoxElementImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  align-self: center;
`;
const BoxElementInfoDiv = styled.div`
  flex: 1;
  padding: 0 2%;
  display: flex;
  align-items: baseline;

  > h3 {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const BoxElementDetailDiv = styled.div`
  display: flex;

  > span {
    margin-right: 8px;
    font-size: 0.8rem;
  }
`;
const BoxElementButtonDiv = styled.div`
  span {
    font-weight: bold;
    margin: 4px;
  }

  button {
    font-weight: bold;
    border: none;
    background: none;
    padding: 2px;
  }
`;
