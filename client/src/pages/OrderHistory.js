import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
function OrderHistory() {
  return (
    <OrderHistoryPageWrapper className="margininside">
      <ManagerMenuDiv>
        <input type="date" />
        <OrderHistoryPageButton text={'확인'} />
      </ManagerMenuDiv>
      <OrderHistoryByDateDiv />
      <OrderHistoryByDateDiv />
      <OrderHistoryByDateDiv />
    </OrderHistoryPageWrapper>
  );
}

export default OrderHistory;

const ManagerMenuDiv = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 10px;

    @media (max-width: 480px) {
      margin-right: 8px;
    }
  }
`;

const OrderHistoryPageWrapper = styled.div`
  flex-direction: column;
`;
