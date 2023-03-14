import { useState } from 'react';
import styled from 'styled-components';
import Post from './Post';

function AddressDiv() {
  const [enroll_company, setEnroll_company] = useState({
    zonecode: '',
    address: '',
    extra: '',
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
    console.log(enroll_company);
  };

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
            name="zonecode"
            onChange={handleInput}
            value={enroll_company.zonecode}
          />
          <button onClick={handleComplete}>주소검색</button>
          {popup && (
            <Post
              company={enroll_company}
              setcompany={setEnroll_company}
            ></Post>
          )}
        </ButtonDiv>
        <input
          className="inputstyle"
          placeholder="주소"
          type="text"
          required={true}
          name="address"
          onChange={handleInput}
          value={enroll_company.address}
        />
        <input
          className="inputstyle"
          placeholder="상세주소"
          type="text"
          required={true}
          name="extra"
          onChange={handleInput}
          value={enroll_company.extra}
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
`;
const TitleDiv = styled.div`
  flex-basis: 75px;
  margin-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  font-family: 'IBM Plex Sans KR', sans-serif;
`;
const InputDiv = styled.div`
  height: 110px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;

  > input {
    width: 145px;
  }
`;
