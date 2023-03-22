import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
function MealBoxCounterDiv({ quantity }) {
  return (
    <CounterDiv>
      <TextButton className="linkstyle">&#8722;</TextButton>
      <Count>{quantity}</Count>
      <TextButton className="linkstyle">&#43;</TextButton>
    </CounterDiv>
  );
}

export default MealBoxCounterDiv;

const CounterDiv = styled.div`
  display: flex;

  > button {
    padding: 0 5px;
    height: fit-content;
  }
`;

const Count = styled.div``;
