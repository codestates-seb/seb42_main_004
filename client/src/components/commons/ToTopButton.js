import { useEffect, useState } from 'react';
import { VscTriangleUp } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import checkFooter from '../../util/checkFooter';

function ToTopButton() {
  const { path } = useLocation();
  const [scroll, setScroll] = useState();

  const calcHeight = () => {
    setScroll(document.body.scrollHeight > window.innerHeight);
  };

  useEffect(() => {
    calcHeight();
  }, [path]);

  // 아래 두개 합치기
  useEffect(() => {
    window.addEventListener('resize', calcHeight);
    return () => {
      window.removeEventListener('resize', calcHeight);
    };
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     window.addEventListener('scroll', handleScroll);
  //   }, 100);
  //   return () => {
  //     clearInterval(timer);
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <Button
      onClick={() => window.scrollTo(0, 0)}
      scroll={scroll}
      havefooter={checkFooter() && 1}
    >
      <VscTriangleUp />
    </Button>
  );
}

export default ToTopButton;

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
