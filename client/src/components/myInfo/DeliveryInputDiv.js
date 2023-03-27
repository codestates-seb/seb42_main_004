import styled from 'styled-components';
import AddressDiv from '../payment/AddessDiv';
import ContentInputDiv from './ContentInputDiv';

function DeliveryInputDiv({
  same,
  setSame,
  save,
  setSave,
  inputValue,
  setInputValue,
  handleInput,
  pathName,
}) {
  return (
    <ContainerDiv>
      <TopDiv>
        <h2>배송지 정보</h2>
        {inputValue.userZipCode &&
        inputValue.userSimpleAddress &&
        inputValue.userDetailAddress ? (
          <div>
            <input
              type="checkbox"
              id="same"
              checked={same}
              onChange={({ target: { checked } }) => setSame(checked)}
            ></input>
            <label htmlFor="same">주문자와동일</label>
          </div>
        ) : null}
      </TopDiv>
      <DeliveryDiv pathName={pathName}>
        <ContentInputDiv
          id="addressee"
          name="addressee"
          labelName="받는분"
          placeholder="받는분"
          value={same ? inputValue.username : inputValue.addressee}
          onChange={handleInput}
          noEdit={same ? true : false}
        />
        <ContentInputDiv
          id="addresseePhoneNumber"
          name="addresseePhoneNumber"
          labelName="연락처"
          placeholder="01#-####-####"
          value={
            same ? inputValue.userPhoneNumber : inputValue.addresseePhoneNumber
          }
          onChange={handleInput}
          noEdit={same ? true : false}
        />
        <AddressDiv
          inputValue={inputValue}
          onChange={handleInput}
          setInputValue={setInputValue}
          user={same ? true : false}
          pathName={pathName}
          same={same}
        />
        {pathName ? null : (
          <SaveDiv>
            <input
              type="checkbox"
              id="save"
              checked={save}
              onChange={({ target: { checked } }) => setSave(checked)}
            ></input>
            <label htmlFor="save">기본 주소지로 저장</label>
          </SaveDiv>
        )}
      </DeliveryDiv>
    </ContainerDiv>
  );
}

export default DeliveryInputDiv;

const ContainerDiv = styled.div`
  input[type='checkbox'] {
    margin-right: 0.5rem;
  }
`;
const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div > * {
    cursor: pointer;
  }
`;

const DeliveryDiv = styled.div`
  margin-top: 2rem;
  padding-bottom: 50px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
  border-bottom: 1px solid var(--black);

  > div {
    width: ${({ pathName }) => (pathName ? `60%` : `100%`)};

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
const SaveDiv = styled.div`
  margin: 3rem 0 0 3rem;

  > * {
    cursor: pointer;
  }
`;
