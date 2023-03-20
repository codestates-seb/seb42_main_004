import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
import PaginationUl from '../components/commons/PaginationUl';
import useGET from '../util/useGET';
import { data } from '../components/orderHistory/dummyData';
import GetTemplate from '../components/commons/GetTemplate';

function OrderHistory() {
  let [date, setDate] = useState(null);
  let [isAdmin, setIsAdmin] = useState(false); // 삭제예정
  let [isPending, error] = useGET(`/orders/users/1`); // 삭제 예정
  // let [data, isPending, error] = useGET(`/orders/users/1`);
  console.log(isPending, error);

  // 관리자
  let dateHandler = (e) => {
    setDate(e.target.value);
  };

  let adminGet = () => {
    // date 어떻게 보냄?
    useGET();
    console.log(date);
    setIsAdmin(false); // 삭제예정
  };

  let renderData = () => {
    let filterByDate = data.reduce((acc, cur) => {
      let orderDate = cur.createdAt.slice(0, 10);
      if (acc[orderDate]) {
        acc[orderDate].push(cur);
      } else {
        acc[orderDate] = [cur];
      }
      return acc;
    }, {});
    console.log(filterByDate);
  };

  useEffect(() => {
    renderData();
  }, []);

  return (
    <GetTemplate isPending={false} error={true} res={null}>
      <OrderHistoryPageWrapper className="margininside">
        {isAdmin && (
          <ManagerMenuDiv>
            <input type="date" onChange={dateHandler} />
            <OrderHistoryPageButton text={'확인'} handler={adminGet} />
          </ManagerMenuDiv>
        )}

        <OrderHistoryByDateDiv />
        <OrderHistoryByDateDiv />
        <OrderHistoryByDateDiv />
        {isAdmin && <PaginationUl page={1} totalpage={22} url="/" />}
      </OrderHistoryPageWrapper>
    </GetTemplate>
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
