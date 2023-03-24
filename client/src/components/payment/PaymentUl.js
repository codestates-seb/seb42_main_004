// import { useState } from 'react';
import styled from 'styled-components';
import ContentDiv from '../myInfo/ContentDiv';
import ContentInputDiv from '../myInfo/ContentInputDiv';
import AddressDiv from './AddessDiv';
import useGET from '../../util/useGET';
import { useEffect } from 'react';
import GetTemplate from '../commons/GetTemplate';

function PaymentUl({ inputValue, setInputValue, orderId }) {
  const [res, isPending, error] = useGET(`/orders/checkout/${orderId}`);

  useEffect(() => {
    if (res) {
      setInputValue(res);
    }
  }, [res]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(inputValue);
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res}>
      <ContainerUl>
        <li>
          <h2>주문자 정보</h2>
          <OrderDiv>
            <ContentDiv name="이름" value={inputValue.username} />
            <ContentDiv name="연락처" value={inputValue.userPhoneNumber} />
            <ContentDiv
              name="주소"
              value={`${inputValue.userSimpleAddress} ${inputValue.userDetailAddress}`}
            />
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
            <ContentInputDiv
              id="addressee"
              name="addressee"
              labelName="받는분"
              placeholder="받는분"
              value={inputValue.addressee}
              onChange={handleInput}
            />
            <ContentInputDiv
              id="addresseePhoneNumber"
              name="addresseePhoneNumber"
              labelName="연락처"
              placeholder="연락처"
              value={inputValue.addresseePhoneNumber}
              onChange={handleInput}
            />
            <AddressDiv
              inputValue={inputValue}
              onChange={handleInput}
              setInputValue={setInputValue}
            />
            <div>
              <input type="checkbox" id="save"></input>
              <label htmlFor="save">기본 배송지로 저장</label>
            </div>
          </DeliveryDiv>
        </li>
      </ContainerUl>
    </GetTemplate>
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
