import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { VscTriangleUp } from 'react-icons/vsc';
import checkFooter from '../../util/checkFooter';

function ToTopButton() {
  const { path } = useLocation();
  const [scroll, setScroll] = useState(false);

  const hasScroll = () => {
    setScroll(document.body.scrollHeight > window.innerHeight);
  };

  useEffect(() => {
    hasScroll();
  }, [path]);

  useEffect(() => {
    if (scroll) {
      window.addEventListener('resize', hasScroll);
      return () => {
        window.removeEventListener('resize', hasScroll);
      };
    }
  }, []);

  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
      scroll={scroll && 1}
      havefooter={checkFooter() && 1}
    >
      <VscTriangleUp />
    </Button>
  );
}

export default ToTopButton;

const Button = styled.button`
  visibility: ${(props) => (props.scroll ? 'visible' : 'hidden')};
  z-index: 15;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: var(--signature_070);
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  transition: all 0.3s;

  > svg {
    fill: var(--white);
  }

  @media screen and (max-width: 768px) {
    bottom: calc(${(props) => (props.havefooter ? '90px' : '0px')} + 0.8rem);
  }

  @media screen and (max-width: 480px) {
    bottom: calc(${(props) => (props.havefooter ? '76px' : '0px')} + 1rem);
  }
`;
