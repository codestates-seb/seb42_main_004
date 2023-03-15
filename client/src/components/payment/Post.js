import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const Post = (props) => {
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
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    props.setcompany({
      ...props.company,
      address: fullAddress,
      zonecode: data.zonecode,
    });
  };

  return (
    <div>
      <Postcode autoClose onComplete={complete} />
    </div>
  );
};

export default Post;

const Postcode = styled(DaumPostcode)``;
