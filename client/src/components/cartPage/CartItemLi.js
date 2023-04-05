import MealBoxEditButton from './MealBoxEditButton';
import MealBoxDeleteButton from './MealBoxDeleteButton';
import MealBoxCounterDiv from './MealBoxCounterDiv';
import MealBoxItemsDiv from './MealBoxItemsDiv';
import styled from 'styled-components';
import { useState } from 'react';

function CartItemLi({ mealbox, value, calcRenderPrice }) {
  let { name, kcal, price, quantity, products } = mealbox;
  let [isChecked, setIsChecked] = useState(true);

  let IsCheckedHandler = () => {
    setIsChecked(!isChecked);
    calcRenderPrice();
  };

  return (
    <CartItemWrapperLi id={value}>
      <CartItemTopDiv>
        <CheckBoxInput
          id={value}
          type="checkbox"
          onChange={IsCheckedHandler}
          checked={isChecked}
        />
        <h2>{name}</h2>
        <CartItemTopButtonsDiv>
          <MealBoxDeleteButton />
          <MealBoxCounterDiv quantity={quantity} />
        </CartItemTopButtonsDiv>
      </CartItemTopDiv>
      <CartItemBottomDiv>
        <MealBoxItemsDiv products={products} />
        <CartItemBottomButtonsDiv>
          <div>{`${kcal.toLocaleString()}kcal`}</div>
          <div>{`${price.toLocaleString()}원`}</div>
          <MealBoxEditButton />
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
  height: fit-content;
  border-radius: 10px;
  background-color: var(--bucket_brown);
  padding: 15px;
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

  > *:last-child {
    font-size: 1.2rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  > div {
    margin-right: 8px;
  }

  > button {
    margin-bottom: -0.16rem;
    padding: 0;
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
