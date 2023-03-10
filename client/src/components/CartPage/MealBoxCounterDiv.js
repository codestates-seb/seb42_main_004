import styled from 'styled-components';

function MealBoxCounterDiv() {
  return (
    <CounterDiv>
      <a href="https://www.google.co.kr/">-</a>
      <div>1</div>
      <a href="https://www.google.co.kr/">+</a>
    </CounterDiv>
  );
}

export default MealBoxCounterDiv;

const CounterDiv = styled.div`
  display: flex;
`;
