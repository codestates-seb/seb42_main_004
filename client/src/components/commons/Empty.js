import { BsCart4 } from 'react-icons/bs';
import styled from 'styled-components';
import { MdOutlineBorderColor } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
function Empty() {
  let location = useLocation();
  console.log(location);
  let { pathname } = location;
  return (
    <CartEmptyDiv>
      {pathname === '/cart' ? <BsCart4 /> : <MdOutlineBorderColor />}
      <Text>
        {pathname === '/cart'
          ? '장바구니가 비었습니다.'
          : '주문내역이 없습니다.'}
      </Text>
    </CartEmptyDiv>
  );
}

export default Empty;

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

const Text = styled.div`
  font-size: large;
  margin-top: 10px;
`;
