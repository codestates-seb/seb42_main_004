import { VscTriangleUp } from 'react-icons/vsc';
import styled from 'styled-components';
import checkFooter from '../../util/checkFooter';
function Component() {
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Button onClick={toTop} height={checkFooter() ? 1 : null}>
      <VscTriangleUp />
    </Button>
  );
}

export default Component;

const Button = styled.button`
  z-index: 15;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: var(--signature_070);
  position: fixed;
  bottom: calc(${(props) => (props.height ? '76px' : '0px')} + 1rem);
  right: 1rem;

  > svg {
    fill: var(--white);
  }
`;
