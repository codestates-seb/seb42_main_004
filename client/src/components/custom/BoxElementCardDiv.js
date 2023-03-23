import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { TextButton } from '../commons/ModalDiv';
import { MealBoxCardContainerDiv } from '../allboxes/MealBoxCardDiv';
import { setProduct } from '../../reducers/customReducer';
// deleteProduct,
function BoxElementCardDiv({ product, quantity, totalQuantity }) {
  quantity = quantity || 0;
  const dispatch = useDispatch();

  // const cardClick = () => {
  //   if (quantity === 0) dispatch(setProduct(quantity + 1));
  //   else if (quantity === 1) dispatch(deleteProduct({ id: product.productId }));
  // };

  const changeQuantity = (key) => () => {
    if (key === 'minus' && quantity <= 1) return;
    else if (key === 'plus' && totalQuantity >= 10)
      return alert('구성품은 10개까지 추가할 수 있습니다');

    const payload = { ...product };
    payload.quantity = key === 'minus' ? quantity - 1 : quantity + 1;
    dispatch(setProduct(payload));
  };

  return (
    <BoxElementContainerDiv
      // onClick={cardClick}
      className="shadow"
      quantity={quantity}
    >
      <BoxElementImg alt="" src={product.imagePath} />
      <BoxElementInfoDiv>
        <h3>{product.name}</h3>
        <BoxElementDetailDiv>
          <span>{product.weight.toLocaleString('ko-KR')}g(ml)</span>
          <span>{product.kcal.toLocaleString('ko-KR')}kcal</span>
          <span>{product.price.toLocaleString('ko-KR')}원</span>
        </BoxElementDetailDiv>
      </BoxElementInfoDiv>
      <div>
        <TextButton onClick={changeQuantity('minus')} className="linkstyle">
          &#8722;
        </TextButton>
        <BoxElementQuantitySpan>{quantity}</BoxElementQuantitySpan>
        <TextButton onClick={changeQuantity('plus')} className="linkstyle">
          &#43;
        </TextButton>
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
const BoxElementQuantitySpan = styled.span`
  font-weight: bold;
  margin: 4px;
`;
