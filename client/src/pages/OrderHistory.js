import { useEffect, useState } from 'react';
import styled from 'styled-components';
import OrderHistoryPageButton from '../components/orderHistory/OrderHistoryPageButton';
import OrderHistoryByDateDiv from '../components/orderHistory/OrderHistoryByDateDiv';
import PaginationUl from '../components/commons/PaginationUl';
import getData from '../util/getData';
import { useSelector } from 'react-redux';
import TabBar from '../components/commons/TabBar';
import Empty from '../components/commons/Empty';
function OrderHistory() {
  let { admin } = useSelector((state) => state.authReducer);

  let [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  let [data, setData] = useState([]);

  let render = () => {
    getData(admin ? `/admin/orders?page=${page}&date=${date}` : `/orders/user`)
      .then((res) => {
        setTotalPages(res?.pageInfo?.totalPages);
        let data = admin ? res.data : res;
        let filterByDateObj = data.reduce((acc, cur) => {
          let orderDate = cur.createdAt.slice(0, 10);
          acc[orderDate] ? acc[orderDate].push(cur) : (acc[orderDate] = [cur]);
          return acc;
        }, {});

        let filterByDateArr = [];
        for (let date in filterByDateObj) {
          filterByDateArr.push({ date, orders: filterByDateObj[date] });
        }

        return filterByDateArr;
      })
      .then((data) => {
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
  }, [page, admin, totalPages]);
  console.log(data.length);
  return (
    <OrderHistoryPageWrapper className="margininside">
      <TabBar pathName="Orders">
        <InnerContent>
          {admin && (
            <ManagerMenuDiv>
              <input type="date" onChange={dateHandler} value={date} />
              <OrderHistoryPageButton
                text={'확인'}
                handler={adminGetOrderHistory}
              />
            </ManagerMenuDiv>
          )}
          {!data.length ? (
            <Empty />
          ) : (
            <>
              {data?.map((el) => {
                return (
                  <OrderHistoryByDateDiv key={el.date} ordersPerDate={el} />
                );
              })}
              admin &&
              <PaginationUl
                page={page}
                totalpage={totalPages}
                setPage={setPage}
              />
            </>
          )}
        </InnerContent>
      </TabBar>
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
  position: relative;
  min-height: calc(100vh - 5rem - 50px);
  flex-direction: column;
  width: 80%;
`;

const InnerContent = styled.div`
  width: 80%;
`;
