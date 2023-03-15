import styled from 'styled-components';

function SurveyBox({ group, title, info, detail }) {
  return (
    <SurveyBoxWrapper>
      <label htmlFor={title}>
        <Input type="radio" name={group} id={title} />
        <BoxTop>
          <h3>{title}</h3>
          {info}
        </BoxTop>
        <div>{detail}</div>
      </label>
    </SurveyBoxWrapper>
  );
}

export default SurveyBox;

const SurveyBoxWrapper = styled.div`
  background-color: ${(props) =>
    props.check ? `var(--signature)` : `var(--product_cocoa)`};
  border-radius: 10px;
  padding: 10px;

  :hover,
  :focus-within {
    background-color: var(--signature);
    color: var(--white);
  }
`;

const Input = styled.input`
  /* visibility: hidden; */
  position: absolute;
  z-index: -999;
`;

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
