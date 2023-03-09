import styled from 'styled-components';

const MainButton = ({ name }) => {
  return (
    <Button className="buttonstyle shadow" name={name}>
      {name}
    </Button>
  );
};

export default MainButton;

const Button = styled.button`
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${({ name }) =>
    name.includes('Log') ? `var(--product_cocoa)` : `var(--bucket_brown)`};
`;
