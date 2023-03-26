import { BsCart4 } from 'react-icons/bs';
import styled from 'styled-components';
function CartEmpty() {
  return (
    <CartEmptyDiv>
      <Icon />
      <Text>장바구니가 비었습니다.</Text>
    </CartEmptyDiv>
  );
}

export default CartEmpty;

const CartEmptyDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 200px;
    height: 200px;
  }
`;

const Icon = styled(BsCart4)``;

const Text = styled.div`
  font-size: large;
  margin-top: 10px;
`;
