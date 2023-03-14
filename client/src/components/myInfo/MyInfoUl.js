import styled from 'styled-components';
import logo from '../../assets/hankkimealLogo.png';

function MyInfoUl() {
  return (
    <ContainerUl>
      <li>
        <h2>내 정보</h2>
        <OrderDiv>
          <ImgDiv>
            <img src={logo} alt="logo" />
          </ImgDiv>
          <div>
            <InfoDiv>
              <TitleDiv>프로필 사진</TitleDiv>
              <div>첨부하기</div>
            </InfoDiv>
            <InfoDiv>
              <TitleDiv>이름</TitleDiv>
              <div>강명주</div>
            </InfoDiv>
            <InfoDiv>
              <TitleDiv>닉네임</TitleDiv>
              <div>맹쥬</div>
            </InfoDiv>
            <InfoDiv>
              <TitleDiv>이메일</TitleDiv>
              <div>myungju030@gmail.com</div>
            </InfoDiv>
            <InfoDiv>
              <TitleDiv>연락처</TitleDiv>
              <div>01012345678</div>
            </InfoDiv>
            <InfoDiv>
              <TitleDiv>주소</TitleDiv>
              <div>주소</div>
            </InfoDiv>
          </div>
        </OrderDiv>
      </li>
      <li>
        <h2>배송지 정보</h2>
        <DeliveryDiv>
          <InfoDiv>
            <TitleDiv>받는분</TitleDiv>
            <div>강명주</div>
          </InfoDiv>
          <InfoDiv>
            <TitleDiv>연락처</TitleDiv>
            <div>01012345678</div>
          </InfoDiv>
          <InfoDiv>
            <TitleDiv>주소</TitleDiv>
            <div>주소</div>
          </InfoDiv>
        </DeliveryDiv>
      </li>
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
  padding-bottom: 50px;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--black);

  > div:last-child {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 3rem;
    word-break: break-all;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;

  > img {
    width: 300px;
    height: 300px;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const TitleDiv = styled.div`
  flex-basis: 75px;
  margin-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  font-family: 'IBM Plex Sans KR', sans-serif;
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
