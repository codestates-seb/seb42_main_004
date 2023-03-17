import { useState } from 'react';
import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
import PaginationUl from '../components/commons/PaginationUl';
import getData from '../util/getData';

function OrderHistory() {
  let [date, setDate] = useState(null);

  let api = `${process.env.REACT_APP_API_URL}`;
  console.log(api);

  // 관리자
  let dateHandler = (e) => {
    setDate(e.target.value);
  };

  let adminGet = () => {
    // date 어떻게 보냄?
    getData();
    console.log(date);
  };

  return (
    <OrderHistoryPageWrapper className="margininside">
      <ManagerMenuDiv>
        <input type="date" onChange={dateHandler} />
        <OrderHistoryPageButton text={'확인'} handler={adminGet} />
      </ManagerMenuDiv>
      <OrderHistoryByDateDiv />
      <OrderHistoryByDateDiv />
      <OrderHistoryByDateDiv />
      <PaginationUl nowpage={1} totalpage={1} url="/" />
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
