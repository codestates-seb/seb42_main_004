import styled from 'styled-components';
import Logo from '../../assets/hankkimealLogo.png';
function Footer() {
  return (
    <FooterWrapper className="marginbase">
      <FooterContent className="margininside">
        <LogoImg src={Logo} alt="logo" />
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
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;

const MemberNameDiv = styled.div`
  display: flex;
  justify-content: space-around;

  span {
    margin: 0 10px;
  }
`;

const LineHr = styled.hr`
  height: 1px;
  background: var(--black);
`;

const Detail = styled.div`
  text-align: center;
`;
