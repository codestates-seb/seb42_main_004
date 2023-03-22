import styled from 'styled-components';
import OrderHistoryByOrderNumber from './OrderHistoryByOrderNumber';

// import postData from '../../util/postData';
// import deleteData from '../../util/deleteData';

function OrderHistoryByDateDiv({ ordersPerDate }) {
  let { date, orders } = ordersPerDate;

  return (
    <HistoryByDateDiv>
      <H3>{date}</H3>
      {orders.map((el) => {
        return <OrderHistoryByOrderNumber key={el.orderNumber} orders={el} />;
      })}
      <hr />
    </HistoryByDateDiv>
  );
}

export default OrderHistoryByDateDiv;

const H3 = styled.h3`
  margin: 10px 0;
  font-size: large;
`;

const HistoryByDateDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
