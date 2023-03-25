import styled from 'styled-components';
import ContentDiv from './ContentDiv';

function DeliveryDiv({ inputValue }) {
  return (
    <>
      <h2>배송지 정보</h2>
      <ContainerDiv>
        <ContentDiv name="받는분" value={inputValue.addressee} />
        <ContentDiv name="연락처" value={inputValue.addresseePhoneNumber} />
        <ContentDiv
          name="주소"
          value={`${inputValue.deliverySimpleAddress} ${inputValue.deliveryDetailAddress}`}
        />
      </ContainerDiv>
    </>
  );
}

export default DeliveryDiv;

const ContainerDiv = styled.div`
  height: 150px;
  margin-top: 2rem;
  padding-bottom: 50px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
  border-bottom: 1px solid var(--black);
`;
