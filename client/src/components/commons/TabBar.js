import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

function TabBar({ pathName, children }) {
  const navigate = useNavigate();

  const handleMyInfo = () => {
    navigate('/myinfo');
  };
  const handleOrders = () => {
    navigate('/myinfo/orderhistory');
  };

  return (
    <TabDiv>
      <BarDiv>
        <FocusSpan
          onClick={handleMyInfo}
          name={pathName && pathName === 'MyInfo' ? 'focus' : ''}
        >
          회원 정보
        </FocusSpan>
        <FocusSpan
          onClick={handleOrders}
          name={pathName && pathName === 'Orders' ? 'focus' : ''}
        >
          주문 내역
        </FocusSpan>
      </BarDiv>
      <ContentDiv>{children}</ContentDiv>
    </TabDiv>
  );
}

export default TabBar;

const TabDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const BarDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
const FocusSpan = styled.span`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 0.8rem 0 0 0.8rem;
  ${({ name }) =>
    name &&
    css`
      background-color: var(--signature);
      color: var(--white);
      width: 50px;
    `}

  ${({ name }) =>
    !name &&
    css`
      background-color: var(--product_cocoa);
    `}

    @media (max-width: 768px) {
    width: 120px;
    height: ${({ name }) => (name ? `45px` : `35px`)};
    padding: 0.8rem;
    border-radius: 0.8rem 0.8rem 0 0;
  }
`;
const ContentDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  padding-top: 4rem;
  border: 2px solid var(--product_cocoa);
  background-color: var(--white_020);
`;
