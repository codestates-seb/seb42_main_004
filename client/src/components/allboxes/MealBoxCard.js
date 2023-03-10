import styled from 'styled-components';

const MealBoxCardLi = styled.li`
  display: inline-flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 5%;
  background-color: var(--head_brown);
`;

const MealBoxImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
`;
const MealBoxH3 = styled.h3`
  font-size: 1.3rem;
`;
const Button = styled.button`
  border: none;
`;

function MealBoxCard() {
  return (
    <MealBoxCardLi className="shadow">
      <MealBoxImg
        className="shadow"
        alt=""
        src="https://biz.chosun.com/resizer/Is4I_Jb-piI8Qhh2XWS7odxTIGQ=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/T76RHKX27GOS5BHD6LCD5W6DNQ.jpg"
      ></MealBoxImg>
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
