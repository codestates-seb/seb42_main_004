import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MainButton = ({ name, url, handler }) => {
  return (
    <Button
      className="buttonstyle shadow"
      name={name}
      onClick={handler && handler}
    >
      {url ? <Link to={url}>{name}</Link> : name}
    </Button>
  );
};

export default MainButton;

export const Button = styled.button`
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: ${({ name }) =>
    name.includes('Log') || name.includes('추천 받기')
      ? `var(--product_cocoa)`
      : `var(--bucket_brown)`};

  > a {
    width: 100%;
    text-decoration: none;
    color: var(--black);
    font-family: inherit;
  }
`;
