import OrderHistoryPageButton from './OrderHistoryPageButton';
import OrderHistoryUl from '../../components/orderHistory/OrderHistoryUl';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import patchData from '../../util/patchData';
import deleteData from '../../util/deleteData';

function OrderHistoryByOrderNumber({ orders }) {
  let isAdmin = false;
  let { username, orderStatus, orderNumber, mealboxes } = orders;
  let [status, setStatus] = useState();
  let [buttonText, setButtonText] = useState('');
  let totalPricePerOrderNum = mealboxes.reduce(
    (acc, cur) => acc + cur.mealboxPrice * cur.mealboxQuantity,
    0
  );

  // 관리자
  let statusHandler = (e) => {
    setStatus(e.target.value);
  };

  let adminPatchStatus = () => {
    patchData(`/admin/orders/status/${orderNumber}`, { status: status });
  };

  // 사용자
  let buttonTextHandler = () => {
    // 버튼 text 설정
    if (orderStatus === '주문완료' || orderStatus === '배송중') {
      setButtonText('주문 취소');
    } else if (orderStatus === '배송완료') {
      setButtonText('반품 신청');
    } else {
      setButtonText('');
    }
  };

  let buttonHandler = () => {
    deleteData(`/orders/${orderNumber}`);
  };

  useEffect(() => {
    buttonTextHandler();
  }, [orderStatus]);

  return (
    <>
      <TopMenuDiv>
        <div>{orderNumber}</div>
        {isAdmin ? (
          <AdminTopMenuDiv>
            <div>{`${username}님`}</div>
            <select name="#" onChange={statusHandler}>
              <option value="주문완료" selected={orderStatus === '주문완료'}>
                주문 완료
              </option>
              <option value="배송중" selected={orderStatus === '배송중'}>
                배송중
              </option>
              <option value="배송완료" selected={orderStatus === '배송완료'}>
                배송 완료
              </option>
              <option value="주문취소" selected={orderStatus === '주문취소'}>
                주문 취소
              </option>
              <option
                value="환불대기중"
                selected={orderStatus === '환불대기중'}
              >
                환불 대기중
              </option>
              <option value="환불완료" selected={orderStatus === '환불완료'}>
                환불 완료
              </option>
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
