import styled from 'styled-components';
import logo from '../../assets/logo_black.png';
import ContentInputDiv from './ContentInputDiv';
import AddressDiv from '../payment/AddessDiv';
import MyInfoButton from './MyInfoButton';

function EditMyInfoUl() {
  return (
    <ContainerUl>
      <li>
        <h2>내 정보</h2>
        <OrderDiv>
          <ImgDiv>
            <img src={logo} alt="logo" />
          </ImgDiv>
          <InfoDiv>
            <ContentInputDiv
              id="profile"
              labelName="프로필 사진"
              value="첨부하기"
            />
            <ContentInputDiv id="nickname" labelName="닉네임" value="맹쥬" />
            <ContentInputDiv
              id="name"
              labelName="이메일"
              value="myungju030@gmail.com"
            />
            <ContentInputDiv
              id="phone"
              labelName="연락처"
              value="01012345678"
            />
            <AddressDiv />
          </InfoDiv>
        </OrderDiv>
      </li>
      <li>
        <TopDiv>
          <h2>배송지 정보</h2>
          <div>
            <input type="checkbox" id="same"></input>
            <label htmlFor="same">주문자와동일</label>
          </div>
        </TopDiv>
        <DeliveryDiv>
          <ContentInputDiv id="orderName" labelName="받는분" value="강명주" />
          <ContentInputDiv
            id="orderPhone"
            labelName="연락처"
            value="01012345678"
          />
          <AddressDiv />
        </DeliveryDiv>
      </li>
      <li>
        <ButtonDiv>
          <MyInfoButton text="수정완료" />
        </ButtonDiv>
      </li>
    </ContainerUl>
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

  div > * {
    cursor: pointer;
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
