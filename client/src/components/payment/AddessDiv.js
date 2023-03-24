import { useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

function AddressDiv({ inputValue, onChange, setInputValue, user }) {
  const [popup, setPopup] = useState(false);

  const handleComplete = () => {
    setPopup(!popup);
  };

  return (
    <ContainerDiv>
      <TitleDiv>주소</TitleDiv>
      <InputDiv>
        <ButtonDiv>
          <input
            className="inputstyle"
            placeholder="우편번호"
            type="text"
            required={true}
            name={user ? 'zipCode' : 'deliveryZipCode'}
            onChange={onChange}
            value={user ? inputValue.zipCode : inputValue.deliveryZipCode}
            disabled
          />
          <AddressButton
            className="buttonstyle shadow"
            onClick={handleComplete}
          >
            주소검색
          </AddressButton>
        </ButtonDiv>
        {popup && (
          <Post
            inputValue={inputValue}
            setInputValue={setInputValue}
            user={user}
          ></Post>
        )}
        <input
          className="inputstyle"
          placeholder="주소"
          type="text"
          required={true}
          name={user ? 'simpleAddress' : 'deliverySimpleAddress'}
          onChange={onChange}
          value={
            user ? inputValue.simpleAddress : inputValue.deliverySimpleAddress
          }
          disabled
        />
        <input
          className="inputstyle"
          placeholder="상세주소"
          type="text"
          required={true}
          name={user ? 'detailAddress' : 'deliveryDetailAddress'}
          onChange={onChange}
          value={
            user ? inputValue.detailAddress : inputValue.deliveryDetailAddress
          }
        />
      </InputDiv>
    </ContainerDiv>
  );
}

export default AddressDiv;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const TitleDiv = styled.div`
  flex-basis: 75px;
  margin-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  font-family: 'IBM Plex Sans KR', sans-serif;

  @media (max-width: 480px) {
    width: 80%;
    margin: 0.5rem 0;
    flex-basis: 0px;
    justify-content: flex-start;
    margin-right: 0px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 60%;
    margin: 0.5rem 0;
    flex-basis: 0px;
    justify-content: flex-start;
    margin-right: 0px;
  }
`;
const InputDiv = styled.div`
  width: 60%;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 480px) {
    width: 80%;
    min-height: 95px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;

  > input {
    width: 60%;
    margin-right: 0.3rem;
  }
`;
const AddressButton = styled.button`
  height: 30px;
  padding: 0px 10px;
  border: none;
  background-color: var(--gray);
`;
