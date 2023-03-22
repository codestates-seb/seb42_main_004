import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
import { AsideSignatureButton, AsideWrapper } from '../commons/CartAside';
import { deleteProduct } from '../../reducers/customReducer';

function CustomAside({ admin, custom, buttonClick }) {
  const dispatch = useDispatch();

  return (
    <AsideWrapper>
      <InAsideBoxDiv>
        <InAsideH2 className="hidden">
          {custom?.id ? custom.name : 'Custom'}
        </InAsideH2>
        {custom && (
          <ElementInBucketUl>
            {custom.products.map((product) => (
              <ElementInBucketLi key={product.productId}>
                <span>{`${product.name}`}</span>
                <span>
                  {`${product.quantity}`}
                  <TextButton
                    onClick={() =>
                      dispatch(deleteProduct({ id: product.productId }))
                    }
                    className="linkstyle"
                  >
                    &#10005;
                  </TextButton>
                </span>
              </ElementInBucketLi>
            ))}
          </ElementInBucketUl>
        )}
        <InAsidePriceDiv>
          <span>
            합계 <span>({custom.kcal?.toLocaleString('ko-KR')}kcal)</span>
          </span>
          <span>{`${custom.price?.toLocaleString('ko-KR')}원`}</span>
        </InAsidePriceDiv>
      </InAsideBoxDiv>
      <AsideSignatureButton onClick={buttonClick}>
        {!admin
          ? '장바구니 담기'
          : custom?.id
          ? '밀박스 수정 진행하기'
          : '밀박스 생성 진행하기'}
      </AsideSignatureButton>
    </AsideWrapper>
  );
}

export default CustomAside;

const InAsideBoxDiv = styled.div`
  background-color: var(--bucket_brown);
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    border-radius: 0;
    box-shadow: -2px -2px 2px rgba(0, 0, 0, 0.4);

    ::before {
      content: '';
      border-bottom: calc(4px * 1.732) solid var(--bucket_brown);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      position: absolute;
      top: -6.4px;
      left: 50%;
    }

    :hover {
      border-radius: 10px 10px 0 0;

      ::before {
        display: none;
      }

      > h2,
      > ul {
        display: block;
      }
    }
  }
`;
const InAsideH2 = styled.h2`
  color: var(--white);
  min-height: 1vh;

  @media (max-width: 480px) {
    display: none;
  }
`;
const ElementInBucketUl = styled.ul`
  @media (max-width: 480px) {
    display: none;
  }
`;
const ElementInBucketLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-size: 0.8rem;
    margin-right: -2px;

    > button {
      margin-left: 0.5rem;
    }
  }
`;
const InAsidePriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: -0.5rem;

  > span {
    > span {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    margin: 0;
  }
`;
