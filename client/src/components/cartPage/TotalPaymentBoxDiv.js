import styled from 'styled-components';

function TotalPaymentBoxDiv() {
  return (
    <div>
      <h3>총 결제 금액</h3>
      <Amount>34,000원</Amount>
    </div>
  );
}

export default TotalPaymentBoxDiv;

const Amount = styled.div`
  font-size: x-large;
`;
