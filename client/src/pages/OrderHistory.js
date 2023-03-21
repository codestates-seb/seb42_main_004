import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
import PaginationUl from '../components/commons/PaginationUl';
import useGET from '../util/useGET';
import { resEx } from '../components/orderHistory/dummyData';
import GetTemplate from '../components/commons/GetTemplate';
import { setHistory } from '../reducers/orderHistoryReducer';
import getData from '../util/getData';

function OrderHistory() {
  let isAdmin = false;
  let dispatch = useDispatch();
  let { data } = useSelector((state) => state.orderHistoryReducer);

  let [date, setDate] = useState(null);
  let [page, setPage] = useState(1);
  let [isPending, error] = useGET(`/orders/users/1`); // 삭제 예정
  // let [res, isPending, error] = useGET(`/orders/users/1`);
  console.log(isPending, error); // 삭제 예정

  // 관리자
  let dateHandler = (e) => {
    setDate(e.target.value);
  };

  let adminParam = `?page=${page}&date=${date}`;
  let adminGetOrderHistory = () => {
    getData(`/admin/orders${adminParam}`).then((res) => {
      dispatch(setHistory(res.data));
    });
  };

  useEffect(() => {
    !false && dispatch(setHistory(resEx.data));
  }, []);

  return (
    <GetTemplate isPending={false} error={false} res={data}>
      <OrderHistoryPageWrapper className="margininside">
        {isAdmin && (
          <ManagerMenuDiv>
            <input type="date" onChange={dateHandler} />
            <OrderHistoryPageButton
              text={'확인'}
              handler={adminGetOrderHistory}
            />
          </ManagerMenuDiv>
        )}
        {data.map((el) => (
          <OrderHistoryByDateDiv key={el.date} ordersPerDate={el} />
        ))}
        {isAdmin && (
          <PaginationUl
            page={page}
            totalpage={22}
            url={`/admin/orders/${adminParam}`}
            setPage={setPage}
          />
        )}
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
