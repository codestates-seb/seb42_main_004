import styled from 'styled-components';
// import ContentDiv from './ContentDiv';
import logo from '../../assets/logo_black.png';
import ContentInputDiv from './ContentInputDiv';
import AddressDiv from '../payment/AddessDiv';

function ModifyMyInfoUl() {
  return (
    <ContainerUl>
      <li>
        <h2>내 정보</h2>
        <OrderDiv>
          <ImgDiv>
            <img src={logo} alt="logo" />
          </ImgDiv>
          <InfoDiv>
            <ContentInputDiv name="프로필 사진" content="첨부하기" />
            <ContentInputDiv id="nickname" name="닉네임" content="맹쥬" />
            <ContentInputDiv
              id="name"
              name="이메일"
              content="myungju030@gmail.com"
            />
            <ContentInputDiv id="phone" name="연락처" content="01012345678" />
            <AddressDiv />
          </InfoDiv>
        </OrderDiv>
      </li>
      <li>
        <h2>배송지 정보</h2>
        <DeliveryDiv>
          <ContentInputDiv id="orderName" name="받는분" content="강명주" />
          <ContentInputDiv
            id="orderPhone"
            name="연락처"
            content="01012345678"
          />
          <AddressDiv />
        </DeliveryDiv>
      </li>
      <li>
        <ButtonDiv>
          <div>비밀번호 수정</div>
          <div>회원 탈퇴</div>
        </ButtonDiv>
      </li>
    </ContainerUl>
  );
}

export default ModifyMyInfoUl;

const ContainerUl = styled.ul`
  min-width: 80%;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    min-width: 90%;
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
const DeliveryDiv = styled.div`
  margin-top: 2rem;
  padding-bottom: 50px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-all;
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
`;
