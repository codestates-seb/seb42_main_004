import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { TextButton } from '../commons/ModalDiv';
import { MealBoxCardContainerDiv } from '../allboxes/MealBoxCardLi';
import { deleteProduct, setProduct } from '../../reducers/customReducer';

function BoxElementCardDiv({ product, quantity, totalQuantity }) {
  quantity = quantity || 0;
  const dispatch = useDispatch();

  const cardClick = () => {
    if (quantity === 0)
      dispatch(setProduct({ ...product, quantity: quantity + 1 }));
    else if (quantity === 1) dispatch(deleteProduct(product.productId));
  };

  const changeQuantity = (key) => () => {
    if (key === 'minus' && quantity <= 1) return;
    else if (key === 'plus' && totalQuantity >= 10)
      return alert('구성품은 10개까지 추가할 수 있습니다');

    const payload = { ...product };
    payload.quantity = key === 'minus' ? quantity - 1 : quantity + 1;
    dispatch(setProduct(payload));
  };

  return (
    <ProductContainerDiv
      onClick={cardClick}
      className="shadow"
      quantity={quantity}
    >
      <ProductImg alt="" src={product.imagePath} />
      <ProductInfoDiv>
        <h3>{product.name}</h3>
        <ProductDetailDiv>
          <span>{product.weight.toLocaleString('ko-KR')}g(ml)</span>
          <span>{product.kcal.toLocaleString('ko-KR')}kcal</span>
          <span>{product.price.toLocaleString('ko-KR')}원</span>
        </ProductDetailDiv>
      </ProductInfoDiv>
      <ProductButtonDiv
        role="button"
        tabIndex={0}
        onKeyUp={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <TextButton onClick={changeQuantity('minus')} className="linkstyle">
          -
        </TextButton>
        <ProductQuantitySpan>{quantity}</ProductQuantitySpan>
        <TextButton onClick={changeQuantity('plus')} className="linkstyle">
          +
        </TextButton>
      </ProductButtonDiv>
    </ProductContainerDiv>
  );
}

export default BoxElementCardDiv;

const ProductContainerDiv = styled(MealBoxCardContainerDiv)`
  flex-direction: row;
  padding: 5px 2rem;
  padding-right: 1.5rem;
  margin-bottom: 10px;
  background-color: var(
    ${(props) => (props.quantity ? '--bucket_brown' : '--product_cocoa')}
  );
  align-items: center;
  justify-content: space-between;
`;
const ProductImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  align-self: center;
`;
const ProductInfoDiv = styled.div`
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
const ProductDetailDiv = styled.div`
  display: flex;

  > span {
    margin-right: 8px;
    font-size: 0.8rem;
  }
`;
const ProductQuantitySpan = styled.span`
  font-weight: bold;
  margin: 4px;
`;
const ProductButtonDiv = styled.div`
  > button,
  > span {
    font-size: 1.3rem;
  }

  > button {
    padding: 0.5rem;
  }
`;
