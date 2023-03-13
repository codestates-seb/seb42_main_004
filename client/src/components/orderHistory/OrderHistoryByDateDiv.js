import styled from 'styled-components';
import OrderHistoryPageButton from './OrderHistoryPageButton';
import OrderHistoryUl from '../../components/orderHistory/OrderHistoryUl';

function OrderHistoryByDateDiv() {
  return (
    <HistoryByDateDiv>
      <H3>2023.04.18</H3>
      <TopMenuDiv>
        <div>2304189829</div>
        <UserTopMenuDiv>
          <OrderHistoryPageButton text={'주문 취소'} />
          <div>주문 완료</div>
        </UserTopMenuDiv>
        <ManagerTopMenuDiv>
          <div>맹쥬님</div>
          <select name="#">
            <option value="주문 완료">주문 완료</option>
            <option value="배송중">배송중</option>
            <option value="배송 완료">배송 완료</option>
            <option value="주문 취소" selected>
              주문 취소
            </option>
            <option value="반품 대기중">반품 대기중</option>
            <option value="반품 완료">반품 완료</option>
          </select>
          <button>확인</button>
        </ManagerTopMenuDiv>
      </TopMenuDiv>
      <OrderHistoryUl />
      <BottomMenuDiv>
        <span>총액</span>
        <span>24,000원</span>
      </BottomMenuDiv>
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

const TopMenuDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  > div:first-child {
    flex-grow: 1;
    color: gray;
  }
`;

const BottomMenuDiv = styled.div`
  margin-bottom: 10px;
  text-align: right;
  font-weight: bold;

  > span:first-child {
    margin-right: 10px;

    @media (max-width: 480px) {
      margin-right: 8px;
    }
  }

  > span:last-child {
    font-size: large;
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

const ManagerTopMenuDiv = styled(UserTopMenuDiv)``;