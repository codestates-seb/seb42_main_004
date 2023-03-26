import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContentDiv from './ContentDiv';
import PasswordInputDiv from './PasswordInputDiv';
import MyInfoButton from './MyInfoButton';
import GetTemplate from '../commons/GetTemplate';
import useGET from '../../util/useGET';
import patchData from '../../util/patchData';
import postData from '../../util/postData';
import EmailDiv from './EmailDiv';
import DeliveryDiv from './DeliveryDiv';
import deleteData from '../../util/deleteData';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../reducers/authReducer';
import { initializeCart } from '../../reducers/cartReducer';
import ProfileImg from './ProfileImg';

function MyInfoUl({ pathName }) {
  const [inputValue, setInputValue] = useState({});
  const [passwordInputValue, setPasswordInputValue] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [imgInput, setImgInput] = useState();
  const [imgInputBuffer, setImgInputBuffer] = useState(inputValue?.imagePath);
  const [res, isPending, error] = useGET('/users');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPasswordInputValue({
      ...passwordInputValue,
      [name]: value,
    });
  };

  const handleClick = () => {
    patchData('/users/password', {
      password: passwordInputValue.password,
      afterPassword: passwordInputValue.newPassword,
    }).then((data) => {
      if (data.status === 200) {
        alert('변경이 완료되었습니다.');
        navigate('/myinfo');
      } else {
        alert('비밀번호를 다시 입력해주세요');
        setPasswordInputValue({
          password: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    });
  };

  useEffect(() => {
    if (res) {
      setInputValue({
        username: res.name,
        email: res.email,
        userPhoneNumber: res.phoneNumber,
        addressee: res.deliveryInformation && res.deliveryInformation.name,
        addresseePhoneNumber:
          res.deliveryInformation && res.deliveryInformation.phoneNumber,
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
        userDetailAddress: (res.address && res.address.detailAddress) || '',
        userSimpleAddress: (res.address && res.address.simpleAddress) || '',
        userZipCode: (res.address && res.address.zipCode) || '',
        imagePath: res.imagePath,
        status: res.status,
      });
      setImgInputBuffer(res.imagePath);
    }
  }, [res]);

  useEffect(() => {
    let reader = new FileReader();
    if (imgInput) {
      reader.readAsDataURL(imgInput);
      if (confirm('사진을 변경하시겠습니까?')) {
        reader.onloadend = () => {
          setImgInputBuffer(reader.result);
        };
        const formData = new FormData();
        formData.append('file', imgInput);
        postData('/users/image', formData).then((data) => {
          if (data.status === 201) {
            alert('사진이 변경되었습니다.');
          } else {
            alert('관리자에게 문의하세요.');
          }
        });
      } else {
        return;
      }
    }
  }, [imgInput]);

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res}
      title={pathName ? '비밀번호 변경하기' : '프로필 보기'}
    >
      <ContainerUl>
        <li>
          <h2>내 정보</h2>
          <OrderDiv>
            <ImgDiv>
              <ProfileImg img={imgInputBuffer} />
            </ImgDiv>
            <InfoDiv>
              <ContentDiv
                name="프로필 사진"
                content="맹쥬"
                onInput={(e) => setImgInput(e.target.files[0])}
              />
              <ContentDiv name="닉네임" value={inputValue.username} />
              <EmailDiv
                name="이메일"
                value={inputValue.email}
                status={inputValue.status}
              />
              <ContentDiv name="연락처" value={inputValue.userPhoneNumber} />
              <ContentDiv
                name="주소"
                value={`${inputValue.userSimpleAddress} ${inputValue.userDetailAddress}`}
              />
            </InfoDiv>
          </OrderDiv>
        </li>
        <li>
          <DeliveryDiv inputValue={inputValue} />
        </li>
        {pathName ? (
          <li>
            <PasswordDiv>
              <PasswordInputDiv
                id="password"
                name="password"
                labelName="비밀번호"
                value={passwordInputValue.password}
                onChange={handleInput}
              />
              <PasswordInputDiv
                id="newPassword"
                name="newPassword"
                labelName="새 비밀번호"
                value={passwordInputValue.newPassword}
                onChange={handleInput}
              />
              <PasswordInputDiv
                id="confirmNewPassword"
                name="confirmNewPassword"
                labelName="새 비밀번호 확인"
                value={passwordInputValue.confirmNewPassword}
                onChange={handleInput}
              />
              <PasswordButtonDiv>
                <MyInfoButton onClick={handleClick} text="변경완료" />
              </PasswordButtonDiv>
            </PasswordDiv>
          </li>
        ) : null}
        {pathName ? null : (
          <li>
            <ButtonDiv>
              <button onClick={() => navigate('/myinfo/edit')}>
                내 정보 수정
              </button>
              <button onClick={() => navigate('/myinfo/edit/password')}>
                비밀번호 수정
              </button>
              <button
                onClick={() => {
                  if (confirm('정말 탈퇴하시겠습니까?')) {
                    deleteData('/users').then(() => {
                      alert('탈퇴되었습니다.');
                      localStorage.removeItem('accessToken');
                      dispatch(
                        setAuth({
                          isLogin: false,
                          accessToken: '',
                          tokenExpirationDate: '',
                          user: {},
                          roles: [],
                        })
                      );
                      dispatch(initializeCart());
                      window.location.reload();
                    });
                  } else {
                    return;
                  }
                }}
              >
                회원 탈퇴
              </button>
            </ButtonDiv>
          </li>
        )}
      </ContainerUl>
    </GetTemplate>
  );
}

export default MyInfoUl;

const ContainerUl = styled.ul`
  min-width: 80%;
  padding: 0;
  list-style: none;
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
const PasswordDiv = styled.div`
  padding-bottom: 50px;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--black);
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  > button {
    width: 100px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: transparent;
    border: none;

    &:hover {
      cursor: pointer;
      color: var(--input_blue);
    }
  }
`;
const PasswordButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;
`;
