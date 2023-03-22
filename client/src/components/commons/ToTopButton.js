import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { VscTriangleUp } from 'react-icons/vsc';
import checkFooter from '../../util/checkFooter';

function ToTopButton() {
  const { path } = useLocation();
  const [scroll, setScroll] = useState(false);
  const [show, setShow] = useState(false);

  const hasScroll = () => {
    const tmp = document.body.scrollHeight > window.innerHeight;
    setScroll(tmp);
    return tmp;
  };

  useEffect(() => {
    hasScroll();
  }, [path]);

  const scrollUp = (e) => {
    if (
      (e.deltaY < 0 && window.scrollY > 200) ||
      window.scrollY + window.innerHeight + 500 >= document.body.scrollHeight
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    if (scroll) {
      window.addEventListener('resize', hasScroll);
      const timer = setInterval(() => {
        window.addEventListener('wheel', scrollUp, { passive: true });
      }, 100);
      return () => {
        window.removeEventListener('resize', hasScroll);
        clearInterval(timer);
        window.removeEventListener('wheel', scrollUp);
      };
    }
  }, []);

  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
      scroll={show && 1}
      havefooter={checkFooter() && 1}
    >
      <VscTriangleUp />
    </Button>
  );
}

export default ToTopButton;

const Button = styled.button`
  opacity: ${(props) => (props.scroll ? 1 : 0)};
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

  @media screen and (max-width: 480px) {
    bottom: calc(${(props) => (props.havefooter ? '76px' : '0px')} + 1rem);
  }
`;
