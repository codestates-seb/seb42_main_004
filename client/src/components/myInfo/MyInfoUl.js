import styled from 'styled-components';
import ContentDiv from './ContentDiv';
import PasswordInputDiv from './PasswordInputDiv';
import MyInfoButton from './MyInfoButton';
import { useEffect, useState } from 'react';

function MyInfoUl({ pathName }) {
  const [imgInput, setImgInput] = useState();
  const [imgInputBuffer, setImgInputBuffer] = useState();

  useEffect(() => {
    let reader = new FileReader();
    if (imgInput) {
      reader.readAsDataURL(imgInput);
      reader.onloadend = () => {
        setImgInputBuffer(reader.result);
      };
    }
    console.log(imgInput);
  }, [imgInput]);

  return (
    <ContainerUl>
      <li>
        <h2>내 정보</h2>
        <OrderDiv>
          <ImgDiv>
            <Img img={imgInputBuffer}></Img>
          </ImgDiv>
          <InfoDiv>
            <ContentDiv
              name="프로필 사진"
              content="맹쥬"
              onInput={(e) => setImgInput(e.target.files[0])}
            />
            <ContentDiv name="닉네임" content="맹쥬" />
            <ContentDiv name="이메일" content="myungju030@gmail.com" />
            <ContentDiv name="연락처" content="01012345678" />
            <ContentDiv name="주소" content="주소" />
          </InfoDiv>
        </OrderDiv>
      </li>
      <li>
        <h2>배송지 정보</h2>
        <DeliveryDiv>
          <ContentDiv name="받는분" content="강명주" />
          <ContentDiv name="연락처" content="01012345678" />
          <ContentDiv name="주소" content="주소" />
        </DeliveryDiv>
      </li>
      {pathName ? (
        <li>
          <PasswordDiv>
            <PasswordInputDiv id="password" name="비밀번호" content="" />
            <PasswordInputDiv id="newPassword" name="새 비밀번호" content="" />
            <PasswordInputDiv
              id="confirmNewPassword"
              name="새 비밀번호 확인"
              content=""
            />
            <ButtonDiv>
              <MyInfoButton text="변경" />
            </ButtonDiv>
          </PasswordDiv>
        </li>
      ) : null}
      {pathName ? null : (
        <li>
          <ButtonDiv>
            <div>내 정보 수정</div>
            <div>비밀번호 수정</div>
            <div>회원 탈퇴</div>
          </ButtonDiv>
        </li>
      )}
    </ContainerUl>
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
const DeliveryDiv = styled.div`
  height: 150px;
  margin-top: 2rem;
  padding-bottom: 50px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
  border-bottom: 1px solid var(--black);
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

  > div {
    width: 100px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &:hover {
      cursor: pointer;
      color: var(--input_blue);
    }
  }

  > button {
    margin-top: 2rem;
  }
`;
const Img = styled.img`
  background-color: var(${(props) => (props.img ? '--white' : '--gray')});
  background-image: url(${(props) => props.img && props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 480px) {
    width: 35vw;
    height: 35vw;
  }
`;
