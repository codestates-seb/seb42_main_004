import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
import PaginationUl from '../components/commons/PaginationUl';
import getData from '../util/getData';
import { resEx } from '../components/orderHistory/dummyData';

function OrderHistory() {
  let isAdmin = true;
  let [page, setPage] = useState(1);
  let [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  let [data, setData] = useState([]);

  let render = () => {
    getData(
      isAdmin
        ? `/admin/orders?page=${page}&date=${date}`
        : `/orders/users/${`1`}`
    )
      .then(() => {
        let filterByDateObj = resEx.data.reduce((acc, cur) => {
          let orderDate = cur.createdAt.slice(0, 10);
          acc[orderDate] ? acc[orderDate].push(cur) : (acc[orderDate] = [cur]);
          return acc;
        }, {});

        let filterByDateArr = [];
        for (let date in filterByDateObj) {
          filterByDateArr.push({ date, orders: filterByDateObj[date] });
        }

        return [filterByDateArr];
      })
      .then(([filterByDateArr]) => {
        setData(filterByDateArr);
      });
  };

  // 관리자
  let dateHandler = (e) => {
    setDate(e.target.value);
  };

  let adminGetOrderHistory = () => {
    render();
  };

  useEffect(() => {
    render();
  }, [page]);

  return (
    <OrderHistoryPageWrapper className="margininside">
      {isAdmin && (
        <ManagerMenuDiv>
          <input type="date" onChange={dateHandler} value={date} />
          <OrderHistoryPageButton
            text={'확인'}
            handler={adminGetOrderHistory}
          />
        </ManagerMenuDiv>
      )}
      {data.map((el) => (
        <OrderHistoryByDateDiv key={el.date} ordersPerDate={el} />
      ))}
      {isAdmin && <PaginationUl page={page} totalpage={22} setPage={setPage} />}
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
