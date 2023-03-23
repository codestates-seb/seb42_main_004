import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
import PaginationUl from '../components/commons/PaginationUl';
import getData from '../util/getData';
// import { resEx } from '../components/orderHistory/dummyData';
import { useSelector } from 'react-redux';

function OrderHistory() {
  let { admin } = useSelector((state) => state.authReducer);
  console.log(admin);
  let [page, setPage] = useState(1);
  let [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  let [data, setData] = useState([]);

  let render = () => {
    getData(admin ? `/admin/orders?page=${page}&date=${date}` : `/orders/users`)
      .then((res) => {
        console.log(res.data);
        let filterByDateObj = res.data.reduce((acc, cur) => {
          let orderDate = cur.createdAt.slice(0, 10);
          acc[orderDate] ? acc[orderDate].push(cur) : (acc[orderDate] = [cur]);
          return acc;
        }, {});
        console.log(filterByDateObj);
        let filterByDateArr = [];
        for (let date in filterByDateObj) {
          filterByDateArr.push({ date, orders: filterByDateObj[date] });
        }
        console.log(filterByDateArr);

        return filterByDateArr;
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  // 관리자
  let dateHandler = (e) => {
    setDate(e.target.value);
  };

  let adminGetOrderHistory = () => {
    page === 1 ? render() : setPage(1);
  };

  useEffect(() => {
    render();
  }, [page]);

  return (
    <OrderHistoryPageWrapper className="margininside">
      {admin && (
        <ManagerMenuDiv>
          <input type="date" onChange={dateHandler} value={date} />
          <OrderHistoryPageButton
            text={'확인'}
            handler={adminGetOrderHistory}
          />
        </ManagerMenuDiv>
      )}
      {data?.map((el) => (
        <OrderHistoryByDateDiv key={el.date} ordersPerDate={el} />
      ))}
      {admin && <PaginationUl page={page} totalpage={22} setPage={setPage} />}
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
