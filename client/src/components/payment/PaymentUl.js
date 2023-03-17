import styled from 'styled-components';
import ContentDiv from '../myInfo/ContentDiv';
import ContentInputDiv from '../myInfo/ContentInputDiv';
import AddressDiv from './AddessDiv';

function PaymentUl() {
  return (
    <ContainerUl>
      <li>
        <h2>주문자 정보</h2>
        <OrderDiv>
          <ContentDiv name="이름" content="강명주" />
          <ContentDiv name="연락처" content="01012345678" />
          <ContentDiv name="주소" content="주소" />
        </OrderDiv>
      </li>
      <li>
        <TopDiv>
          <h2>배송지 정보</h2>
          <div>
            <input type="checkbox" id="same"></input>
            <label htmlFor="same">주문자와동일</label>
          </div>
        </TopDiv>
        <DeliveryDiv>
          <ContentInputDiv id="orderName" labelName="받는분" value="강명주" />
          <ContentInputDiv
            id="orderPhone"
            labelName="연락처"
            value="01012345678"
          />
          <AddressDiv />
          <div>
            <input type="checkbox" id="save"></input>
            <label htmlFor="save">기본 배송지로 저장</label>
          </div>
        </DeliveryDiv>
      </li>
    </ContainerUl>
  );
}

export default PaymentUl;

const ContainerUl = styled.ul`
  min-width: 50%;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const OrderDiv = styled.div`
  height: 150px;
  margin-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
  border-bottom: 1px solid var(--black);
`;
const DeliveryDiv = styled.div`
  margin-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
  border-bottom: 1px solid var(--black);

  > div {
    width: 100%;
  }

  > div:last-child {
    margin-top: 3rem;

    > * {
      cursor: pointer;
    }
  }
`;
const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;

  div > * {
    cursor: pointer;
  }
`;
