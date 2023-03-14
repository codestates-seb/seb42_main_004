import styled from 'styled-components';
import LogoBlack from '../../assets/logo_black.png';
function Footer() {
  return (
    <FooterWrapper className="marginbase">
      <FooterContent className="margininside">
        <LogoImg src={LogoBlack} alt="logo" />
        <MemberNameDiv>
          <div>
            <span>맹쥬</span>
            <span>하미</span>
            <span>유니</span>
          </div>
          <div>
            <span>써니</span>
            <span>주니</span>
            <span>혀기</span>
          </div>
        </MemberNameDiv>
        <LineHr />
        <Detail>
          <div>실제 운영되는 사이트가 아닙니다</div>
          <div>
            <span>고객센터</span>
            <span>02-1234-5678</span>
          </div>
        </Detail>
      </FooterContent>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.footer`
  width: 100%;
  height: 280px;
  background-color: var(--signature);
  color: var(--white);

  @media (max-width: 768px) {
    height: 230px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const FooterContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 768px) {
    align-items: center;
  }
  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const LogoImg = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40px;
  width: 60px;
  height: 60px;

  @media (max-width: 480px) {
    top: 10px;
    left: 46px;
  }
`;

const MemberNameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;

  span {
    margin: 0 40px;
  }

  @media (max-width: 768px) {
    display: block;
    padding-top: 100px;
  }

  @media (max-width: 480px) {
    padding-top: 60px;

    > div {
      span {
        margin: 0 20px;
      }

      > span:first-child {
        margin-left: 0;
      }
    }
  }
`;

const LineHr = styled.hr`
  background-color: var(--white);
  @media (max-width: 768px) {
    display: none;
  }
`;

const Detail = styled.div`
  text-align: center;

  @media (max-width: 480px) {
    text-align: left;

    > div:first-child {
      margin-bottom: 8px;
    }
  }
`;
