import styled from 'styled-components';

function TotalPaymentBoxDiv() {
  return (
    <TotalPaymentBox>
      <h3>총 결제 금액</h3>
      <Amount>34,000원</Amount>
      <a href="https://www.google.co.kr/?hl=ko">구매하기</a>
    </TotalPaymentBox>
  );
}

export default TotalPaymentBoxDiv;

const TotalPaymentBox = styled.div`
  position: fixed;
  right: 16px;
  width: 30%;
  height: 257px;
  background-color: var(--white_020);
  border: 2px solid var(--signature);
  border-radius: 10px;
`;

const Amount = styled.div`
  font-size: x-large;
`;
