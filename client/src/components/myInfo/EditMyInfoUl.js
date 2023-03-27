import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentInputDiv from '../myInfo/ContentInputDiv';
import MyInfoButton from './MyInfoButton';
import AddressDiv from '../payment/AddessDiv';
import GetTemplate from '../commons/GetTemplate';
import useGET from '../../util/useGET';
import patchData from '../../util/patchData';
import ProfileImg from './ProfileImg';
import DeliveryInputDiv from './DeliveryInputDiv';

function EditMyInfoUl() {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    addressee: '',
    addresseePhoneNumber: '',
    deliveryDetailAddress: '',
    deliverySimpleAddress: '',
    deliveryZipCode: '',
    detailAddress: '',
    simpleAddress: '',
    zipCode: '',
    imagePath: '',
  });
  const [res, isPending, error] = useGET('/users');
  const [same, setSame] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (res) {
      setInputValue({
        name: res.name || '',
        email: res.email || '',
        phoneNumber: res.phoneNumber || '',
        addressee:
          (res.deliveryInformation && res.deliveryInformation.name) || '',
        addresseePhoneNumber:
          (res.deliveryInformation && res.deliveryInformation.phoneNumber) ||
          '',
        deliveryDetailAddress:
          (res.deliveryInformation &&
            res.deliveryInformation.address &&
            res.deliveryInformation.address.detailAddress) ||
          '',
        deliverySimpleAddress:
          (res.deliveryInformation &&
            res.deliveryInformation.address &&
            res.deliveryInformation.address.simpleAddress) ||
          '',
        deliveryZipCode:
          (res.deliveryInformation &&
            res.deliveryInformation.address &&
            res.deliveryInformation.address.zipCode) ||
          '',
        detailAddress: (res.address && res.address.detailAddress) || '',
        simpleAddress: (res.address && res.address.simpleAddress) || '',
        zipCode: (res.address && res.address.zipCode) || '',
        imagePath: res.imagePath || '',
      });
    }
  }, [res]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleClick = () => {
    if (same) {
      patchData('/users', {
        name: inputValue.name,
        phoneNumber: inputValue.phoneNumber,
        address: {
          zipCode: inputValue.zipCode,
          simpleAddress: inputValue.simpleAddress,
          detailAddress: inputValue.detailAddress,
        },
        deliveryInformation: {
          name: inputValue.name,
          phoneNumber: inputValue.phoneNumber,
          address: {
            zipCode: inputValue.zipCode,
            simpleAddress: inputValue.simpleAddress,
            detailAddress: inputValue.detailAddress,
          },
        },
      }).then((data) => {
        if (data.status === 200) {
          if (confirm('수정하시겠습니까?')) {
            alert('수정이 완료되었습니다');
            navigate('/myinfo');
          } else {
            return;
          }
        }
      });
    } else {
      patchData('/users', {
        name: inputValue.name,
        phoneNumber: inputValue.phoneNumber,
        address: {
          zipCode: inputValue.zipCode,
          simpleAddress: inputValue.simpleAddress,
          detailAddress: inputValue.detailAddress,
        },
        deliveryInformation: {
          name: inputValue.addressee,
          phoneNumber: inputValue.addresseePhoneNumber,
          address: {
            zipCode: inputValue.deliveryZipCode,
            simpleAddress: inputValue.deliverySimpleAddress,
            detailAddress: inputValue.deliveryDetailAddress,
          },
        },
      }).then((data) => {
        if (data.status === 200) {
          if (confirm('수정하시겠습니까?')) {
            alert('수정이 완료되었습니다');
            navigate('/myinfo');
          } else {
            return;
          }
        }
      });
    }
  };

  useEffect(() => {
    if (inputValue.phoneNumber.length === 11) {
      setInputValue({
        ...inputValue,
        ['phoneNumber']: inputValue.phoneNumber.replace(
          /(\d{3})(\d{4})(\d{4})/,
          '$1-$2-$3'
        ),
      });
    } else if (inputValue.addresseePhoneNumber.length === 11) {
      setInputValue({
        ...inputValue,
        ['addresseePhoneNumber']: inputValue.addresseePhoneNumber.replace(
          /(\d{3})(\d{4})(\d{4})/,
          '$1-$2-$3'
        ),
      });
    }
  }, [inputValue.phoneNumber, inputValue.addresseePhoneNumber]);

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res}
      title="프로필 수정하기"
    >
      <ContainerUl>
        <li>
          <h2>내 정보</h2>
          <OrderDiv>
            <ImgDiv>
              <ProfileImg img={inputValue.imagePath} />
            </ImgDiv>
            <InfoDiv>
              <ContentInputDiv
                id="name"
                name="name"
                labelName="닉네임"
                placeholder="닉네임"
                value={inputValue.name}
                onChange={handleInput}
              />
              <ContentInputDiv
                id="email"
                name="email"
                labelName="이메일"
                placeholder="이메일"
                value={inputValue.email}
                onChange={handleInput}
                noEdit={true}
              />
              <ContentInputDiv
                id="phoneNumber"
                name="phoneNumber"
                labelName="연락처"
                placeholder="연락처"
                value={inputValue.phoneNumber}
                onChange={handleInput}
              />
              <AddressDiv
                inputValue={inputValue}
                onChange={handleInput}
                setInputValue={setInputValue}
                user={true}
                pathName="MyInfo"
              />
            </InfoDiv>
          </OrderDiv>
        </li>
        <li>
          <DeliveryInputDiv
            same={same}
            setSame={setSame}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleInput={handleInput}
            pathName="MyInfo"
          />
        </li>
        <li>
          <ButtonDiv>
            <MyInfoButton onClick={handleClick} text="수정완료" />
            <button onClick={() => navigate('/myinfo')} className="linkstyle">
              취소
            </button>
          </ButtonDiv>
        </li>
      </ContainerUl>
    </GetTemplate>
  );
}

export default EditMyInfoUl;

const ContainerUl = styled.ul`
  min-width: 80%;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
const OrderDiv = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--black);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const InfoDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2rem;
  padding-bottom: 50px;
  word-break: break-all;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
const ImgDiv = styled.div`
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > * {
    margin-top: 1rem;
  }

  button:last-child {
    border: none;
    background-color: transparent;
  }
`;
