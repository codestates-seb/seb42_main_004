import { useEffect, useState } from 'react';
import { VscTriangleUp } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import checkFooter from '../../util/checkFooter';

function Component() {
  const { path } = useLocation();
  const [scroll, setScroll] = useState();

  const toTop = () => {
    window.scrollTo(0, 0);
  };
  // resize, page이동
  const calcHeight = () => {
    setScroll(document.body.scrollHeight > window.innerHeight);
  };

  useEffect(() => {
    calcHeight();
  }, [path]);

  useEffect(() => {
    window.addEventListener('resize', calcHeight);
    return () => {
      window.removeEventListener('resize', calcHeight);
    };
  }, []);

  return (
    <Button
      onClick={toTop}
      scroll={scroll}
      havefooter={checkFooter() ? 1 : null}
    >
      <VscTriangleUp />
    </Button>
  );
}

export default Component;

const Button = styled.button`
  display: ${(props) => (props.scroll ? 'block' : 'none')};
  z-index: 15;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: var(--signature_070);
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  > svg {
    fill: var(--white);
  }

  @media screen and (max-width: 480px) {
    bottom: calc(${(props) => (props.havefooter ? '76px' : '0px')} + 1rem);
  }
`;
