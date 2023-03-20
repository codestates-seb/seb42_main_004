import MealBoxEditLink from './MealBoxEditLink';
import MealBoxDeleteButton from './MealBoxDeleteButton';
import MealBoxCounterDiv from './MealBoxCounterDiv';
import MealBoxItemsDiv from './MealBoxItemsDiv';
import styled from 'styled-components';

function CartItemLi() {
  return (
    <CartItemWrapperLi>
      <CartItemTopDiv>
        <CheckBoxInput type={'checkbox'} checked />
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
          <div>320kcal</div>
          <div>17,000원</div>
          <MealBoxEditLink />
        </CartItemBottomButtonsDiv>
      </CartItemBottomDiv>
    </CartItemWrapperLi>
  );
}

export default CartItemLi;

const CheckBoxInput = styled.input`
  margin-right: 10px;
`;

export const CartItemWrapperLi = styled.li`
  /* width: 60%%; */
  /* max-width: 645px; */
  height: fit-content;
  border-radius: 10px;
  background-color: var(--bucket_brown);
  padding: 15px;

  @media (max-width: 480px) {
    /* width: 323px; */
  }
`;

export const CartItemTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > h2 {
    color: var(--white);
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;

export const CartItemBottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const CartItemBottomButtonsDiv = styled.div`
  display: flex;
  align-items: flex-end;

  > *:not(:first-child) {
    font-size: 1.2rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  > div {
    margin-right: 0.8rem;
  }
`;

const CartItemTopButtonsDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: end;

  > div {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.2rem;
  }
`;
