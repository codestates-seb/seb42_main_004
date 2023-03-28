import styled from 'styled-components';

function CartAside({ totalPrice = 0, buttonClick, pathName }) {
  return (
    <AsideWrapper>
      <InnerDiv>
        <InnerPriceDiv>
          <span>총 결제금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </InnerPriceDiv>
      </InnerDiv>
      <AsideSignatureButton onClick={buttonClick}>
        {pathName ? '결제하기' : '구매하기'}
      </AsideSignatureButton>
    </AsideWrapper>
  );
}

export default CartAside;

export const AsideWrapper = styled.aside`
  float: right;
  position: sticky;
  top: calc(70px + 2rem);
  min-width: 30%;
  height: fit-content;
  font-weight: bold;

  @media (max-width: 768px) {
    z-index: 19;
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    margin: 0 -16px;
    min-width: 360px;
  }
`;
export const AsideSignatureButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem 0;
  font-weight: bold;
  color: var(--white);
  background-color: var(--signature);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 0 2px var(--signature) inset, 2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    border-radius: 0;
  }
`;
const InnerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  background-color: var(--white_020);
  box-shadow: 0 0 0 2px var(--signature) inset, 2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    border-radius: 0;
    background-color: var(--white);
    box-shadow: none;
    border-top: 2px solid var(--signature);
    height: 40px;
  }
`;
const InnerPriceDiv = styled.div`
  display: flex;
  flex-direction: column;

  > span:last-child {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around !important;
    align-items: center;

    > span:last-child {
      font-size: 1.5rem;
    }
  }
`;
