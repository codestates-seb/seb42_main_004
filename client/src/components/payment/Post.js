import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const Post = ({ inputValue, setInputValue, user }) => {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    {
      user
        ? setInputValue({
            ...inputValue,
            userSimpleAddress: fullAddress,
            userZipCode: data.zonecode,
            userDetailAddress: '',
          })
        : setInputValue({
            ...inputValue,
            deliverySimpleAddress: fullAddress,
            deliveryZipCode: data.zonecode,
            deliveryDetailAddress: '',
          });
    }
  };

  return (
    <div>
      <Postcode autoClose onComplete={complete} />
    </div>
  );
};

export default Post;

const Postcode = styled(DaumPostcode)``;
