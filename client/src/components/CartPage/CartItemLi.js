import MealBoxEditLink from './MealBoxEditLink';
import MealBoxDeleteButton from './MealBoxDeleteButton';
import MealBoxCounterDiv from './MealBoxCounterDiv';
import MealBoxItemsDiv from './MealBoxItemsDiv';
import styled from 'styled-components';

function CartItemLi() {
  return (
    <CheckBoxAndCartItemLi>
      <WebCheckBoxInput type={'checkbox'} />
      <CartItemWrapperDiv>
        <CartItemTopDiv>
          <MobileCheckBoxInput type={'checkbox'} />
          <h2>Custom</h2>
          <CartItemTopButtonsDiv>
            <div>수량</div>
            <MealBoxCounterDiv />
            <MealBoxDeleteButton />
          </CartItemTopButtonsDiv>
        </CartItemTopDiv>
        <CartItemBottomDiv>
          <MealBoxItemsDiv />
          <CartItemBottomButtonsDiv>
            <div>17,000원</div>
            <MealBoxEditLink />
          </CartItemBottomButtonsDiv>
        </CartItemBottomDiv>
      </CartItemWrapperDiv>
    </CheckBoxAndCartItemLi>
  );
}

export default CartItemLi;

export const CheckBoxAndCartItemLi = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const WebCheckBoxInput = styled.input`
  margin: 10px;

  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileCheckBoxInput = styled.input`
  margin-right: 10px;

  @media (min-width: 480px) {
    display: none;
  }
`;

export const CartItemWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 645px;
  height: fit-content;
  border-radius: 10px;
  background-color: var(--bucket_brown);
  padding: 15px;

  @media (max-width: 480px) {
    width: 323px;
  }
`;

const CartItemTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  > h2 {
    color: var(--white);
  }
`;

const CartItemBottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const CartItemBottomButtonsDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const CartItemTopButtonsDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;
`;
