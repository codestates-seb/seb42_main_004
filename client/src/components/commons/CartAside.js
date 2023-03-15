import styled from 'styled-components';

function CartAside({ children, type, buttonClick }) {
  return (
    <AsideWrapper>
      <AsideTotalPriceDiv custom={type && 1}>
        {type && <TriangleDiv />}
        {children}
      </AsideTotalPriceDiv>
      <AsideSignatureButton onClick={buttonClick}>
        {type ? type : '구매하기'}
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
    ${(props) => (props.custom ? '--bucket_brown' : '--white_020')}
  );
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 0 2px
      var(${(props) => (props.custom ? '--bucket_brown' : '--signature')}) inset,
    2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    border-radius: 0;

    :hover {
      border-radius: 10px 10px 0 0;

      > h2,
      > ul {
        display: block;
      }

      div:first-child {
        display: none;
      }
    }

    > div {
      margin: 0;
    }
  }
`;
const TriangleDiv = styled.div`
  display: none;
  width: 0;
  height: 0;
  border-bottom: calc(4px * 1.732) solid var(--bucket_brown);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: absolute;
  top: -6.4px;
  left: 50%;

  @media (max-width: 480px) {
    display: block;
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
