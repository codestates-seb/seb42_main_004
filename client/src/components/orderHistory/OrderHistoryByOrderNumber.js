import OrderHistoryPageButton from './OrderHistoryPageButton';
import OrderHistoryUl from '../../components/orderHistory/OrderHistoryUl';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import patchData from '../../util/patchData';
import deleteData from '../../util/deleteData';
import { useSelector } from 'react-redux';

function OrderHistoryByOrderNumber({ orders }) {
  let { admin } = useSelector((state) => state.authReducer);
  let { username, deliveryDate, orderStatus, orderNumber, mealboxes } = orders;
  let [status, setStatus] = useState(orderStatus);
  let [buttonText, setButtonText] = useState('');
  let [isRefundable, setIsRefundable] = useState(false);

  let totalPricePerOrderNum = mealboxes.reduce(
    (acc, cur) => acc + cur.mealboxPrice * cur.mealboxQuantity,
    0
  );

  // 관리자
  let statusHandler = (e) => {
    setStatus(e.target.value);
  };

  let adminPatchStatus = () => {
    patchData(`/admin/orders/status/${orderNumber}`, { status: status }).then(
      () => alert('상태가 변경되었습니다.')
    );
  };

  // 사용자
  let buttonTextHandler = () => {
    if (orderStatus === '주문완료' || orderStatus === '배송중') {
      setButtonText('주문 취소');
    } else if (orderStatus === '배송완료' && isRefundable) {
      setButtonText('반품 신청');
    } else {
      setButtonText('');
    }
  };

  let refundHandler = () => {
    if (!deliveryDate) return setIsRefundable(false);

    let [y, m, d] = deliveryDate.split('-');
    let refundDay = String(Number(d) + 1);
    let refundMonth = String(Number(m) - 1);
    let refundDueDate = new Date(y, refundMonth, refundDay);
    setIsRefundable(refundDueDate <= new Date() ? true : false);
  };

  let buttonHandler = () => {
    if (confirm('주문을 취소하시겠습니까?')) {
      deleteData(`/orders/${orderNumber}`);
      alert('주문이 취소되었습니다.');
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!admin) {
      buttonTextHandler();
      refundHandler();
    }
  }, []);

  return (
    <>
      <TopMenuDiv>
        <div>{orderNumber}</div>
        {admin ? (
          <AdminTopMenuDiv>
            <div>{`${username}님`}</div>
            <select name="#" onChange={statusHandler} value={status}>
              <option value="주문완료">주문 완료</option>
              <option value="배송중">배송중</option>
              <option value="배송완료">배송 완료</option>
              <option value="주문취소">주문 취소</option>
              <option value="환불대기중">환불 대기중</option>
              <option value="환불완료">환불 완료</option>
            </select>
            <button onClick={adminPatchStatus}>확인</button>
          </AdminTopMenuDiv>
        ) : (
          <UserTopMenuDiv>
            {buttonText && (
              <OrderHistoryPageButton
                text={buttonText}
                handler={buttonHandler}
              />
            )}
            <div>{orderStatus}</div>
          </UserTopMenuDiv>
        )}
      </TopMenuDiv>
      <OrderHistoryUl mealBoxes={mealboxes} />
      <BottomMenuDiv>
        <span>총액</span>
        <span>{`${totalPricePerOrderNum}원`}</span>
      </BottomMenuDiv>
    </>
  );
}

export default OrderHistoryByOrderNumber;

const TopMenuDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  white-space: nowrap;
  > div:first-child {
    flex-grow: 1;
    color: gray;
  }
`;

const BottomMenuDiv = styled.div`
  margin-bottom: 10px;
  text-align: right;

  > span:first-child {
    margin-right: 10px;
    font-family: 'IBM Plex Sans KR', sans-serif;

    @media (max-width: 480px) {
      margin-right: 8px;
    }
  }

  > span:last-child {
    font-size: 1.5rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;

const UserTopMenuDiv = styled.div`
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 10px;

    @media (max-width: 480px) {
      margin-right: 5px;
    }
  }
`;

const AdminTopMenuDiv = styled(UserTopMenuDiv)``;
