import styled from 'styled-components';
import ContentDiv from '../myInfo/ContentDiv';
import DeliveryInputDiv from '../myInfo/DeliveryInputDiv';

function PaymentUl({
  save,
  setSave,
  same,
  setSame,
  inputValue,
  setInputValue,
}) {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
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
        <DeliveryInputDiv
          same={same}
          setSame={setSame}
          save={save}
          setSave={setSave}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleInput={handleInput}
        />
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
