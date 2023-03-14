import styled from 'styled-components';

function CartAside({ open, inDiv, type }) {
  return (
    <AsideWrapper>
      {open && open}
      <AsideTotalPriceDiv type={type === 'custom' && 1}>
        {inDiv}
      </AsideTotalPriceDiv>
      <AsideSignatureButton>
        {type === 'custom' ? '장바구니 담기' : '구매하기'}
      </AsideSignatureButton>
    </AsideWrapper>
  );
}

export default CartAside;

const AsideWrapper = styled.aside`
  float: right;
  position: sticky;
  top: calc(70px + 2rem);
  min-width: 30%;
  height: fit-content;
  font-weight: bold;

  @media (max-width: 480px) {
    z-index: 999;
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100%;
    margin: 0 -16px;
    min-width: 360px;
  }
`;
const AsideTotalPriceDiv = styled.div`
  background-color: var(
    ${(props) => (props.type ? '--bucket_brown' : '--white_020')}
  );
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 0 2px
      var(${(props) => (props.type ? '--bucket_brown' : '--signature')}) inset,
    2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    border-radius: 0;

    :hover {
      > h2,
      > ul {
        display: block;
      }
    }

    > div {
      margin: 0;
    }
  }
`;
const AsideSignatureButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem 0;
  font-weight: bold;
  color: var(--white);
  background-color: var(--signature);
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 0 2px var(--signature) inset, 2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    border-radius: 0;
  }
`;
