import styled from 'styled-components';

function SurveyBox({
  id,
  title,
  group,
  info,
  children,
  changeHandler,
  checked,
}) {
  return (
    <>
      <Input
        type="radio"
        name={group}
        id={id}
        onChange={changeHandler}
        checked={checked}
      />
      <SurveyBoxLabel htmlFor={id}>
        <BoxTop>
          <h3>{title}</h3>
          {info}
        </BoxTop>
        {children}
      </SurveyBoxLabel>
    </>
  );
}

export default SurveyBox;

const SurveyBoxLabel = styled.label`
  display: block;
  background-color: var(--product_cocoa);
  border-radius: 10px;
  padding: 15px;

  :hover {
    background-color: var(--bucket_brown_070);
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const Input = styled.input`
  position: absolute;
  z-index: -999;
  :checked + label {
    background-color: var(--signature);
    color: var(--white);
  }
`;

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > h3 {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.4rem;
  }
`;
