import styled from 'styled-components';
import { MealBoxCardContainerDiv } from '../allboxes/MealBoxCardDiv';

function BoxElementCardDiv() {
  return (
    <BoxElementContainerDiv className="shadow">
      {/* <BoxElementImgDiv> */}
      <BoxElementImg
        alt=""
        src="https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1444648_20211125135829503.png"
      />
      {/* </BoxElementImgDiv> */}
      <BoxElementTitle>오렌지 주스</BoxElementTitle>
      <div>
        <span>-</span>
        <span>1</span>
        <span>+</span>
      </div>
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
  font-weight: bold;

  span {
    margin: 2px;
  }
`;
const BoxElementImg = styled.img`
  width: 100px;
  height: 60px;
  object-fit: contain;
  align-self: center;
`;
const BoxElementTitle = styled.div`
  flex: 1;
  padding: 0 3%;
`;
