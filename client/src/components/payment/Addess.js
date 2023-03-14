import { useState } from 'react';
import Post from './Post';

function Address() {
  const [enroll_company, setEnroll_company] = useState({
    address: '',
    zonecode: '',
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
    <div className="address_search">
      주소
      <input
        placeholder="우편번호"
        type="text"
        required={true}
        name="zonecode"
        onChange={handleInput}
        value={enroll_company.zonecode}
      />
      <input
        placeholder="주소"
        type="text"
        required={true}
        name="address"
        onChange={handleInput}
        value={enroll_company.address}
      />
      <button onClick={handleComplete}>우편번호 찾기</button>
      {popup && (
        <Post company={enroll_company} setcompany={setEnroll_company}></Post>
      )}
    </div>
  );
}

export default Address;
