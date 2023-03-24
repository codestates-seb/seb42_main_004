import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ContentInputDiv from '../myInfo/ContentInputDiv';
import MyInfoButton from './MyInfoButton';
import AddressDiv from '../payment/AddessDiv';
import GetTemplate from '../commons/GetTemplate';
import useGET from '../../util/useGET';
import patchData from '../../util/patchData';
import profile from '../../assets/profile.png';

function EditMyInfoUl() {
  const [inputValue, setInputValue] = useState({});
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
          alert('수정이 완료되었습니다');
          navigate('/myinfo');
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
          alert('수정이 완료되었습니다');
          navigate('/myinfo');
        }
      });
    }
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res}>
      <ContainerUl>
        <li>
          <h2>내 정보</h2>
          <OrderDiv>
            <ImgDiv>
              <img src={inputValue.imagePath || profile} alt="logo" />
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
              />
            </InfoDiv>
          </OrderDiv>
        </li>
        <li>
          <TopDiv>
            <h2>배송지 정보</h2>
            <div>
              <input
                type="checkbox"
                id="same"
                checked={same}
                onChange={({ target: { checked } }) => setSame(checked)}
              ></input>
              <label htmlFor="same">주문자와동일</label>
            </div>
          </TopDiv>
          <DeliveryDiv>
            <ContentInputDiv
              id="addressee"
              name="addressee"
              labelName="받는분"
              placeholder="받는분"
              value={same ? inputValue.name : inputValue.addressee}
              onChange={handleInput}
            />
            <ContentInputDiv
              id="addresseePhoneNumber"
              name="addresseePhoneNumber"
              labelName="연락처"
              placeholder="받는분"
              value={
                same ? inputValue.phoneNumber : inputValue.addresseePhoneNumber
              }
              onChange={handleInput}
            />
            <AddressDiv
              inputValue={inputValue}
              onChange={handleInput}
              setInputValue={setInputValue}
              user={same ? true : false}
            />
          </DeliveryDiv>
        </li>
        <li>
          <ButtonDiv>
            <MyInfoButton onClick={handleClick} text="수정완료" />
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
    width: 100%;
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

  > img {
    width: 300px;
    height: 300px;
  }
`;
const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div > * {
    cursor: pointer;
  }

  input {
    margin-right: 0.5rem;
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
    width: 60%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
