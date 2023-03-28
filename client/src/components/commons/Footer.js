import styled from 'styled-components';
import LogoWhite from '../../assets/logo_white.png';
import checkFooter from '../../util/checkFooter';

function Footer() {
  // (모바일) 사용자/관리자 커스텀 페이지, 결제 페이지, 장바구니 -> X

  let fe = [
    {
      name: '맹쥬',
      github: 'https://github.com/myungju030/',
      blog: 'https://velog.io/@jooooo',
    },
    {
      name: '하미',
      github: 'https://github.com/qwerty00ui88',
      blog: 'https://velog.io/@hameee',
    },
    {
      name: '유니',
      github: 'https://github.com/YUNH7',
      blog: 'https://codeyun2.tistory.com/',
    },
  ];

  let be = [
    {
      name: '써니',
      github: 'https://github.com/Taeyang-Jin',
      blog: 'https://suns3t-cording.tistory.com/',
    },
    {
      name: '주니',
      github: 'https://github.com/WiJunSeong',
      blog: 'https://velog.io/@jsw4883',
    },
    {
      name: '혀기',
      github: 'https://github.com/sanggur591',
      blog: 'https://velog.io/@sanggur591',
    },
  ];

  return (
    <FooterWrapper className="marginbase" isVisible={!checkFooter()}>
      <FooterContent className="margininside">
        <LogoImg src={LogoWhite} alt="logo" />
        <LineHr />
        <MemeberWrapper>
          {[fe, be].map((group, groupKey) => {
            return (
              <MemberGroup key={groupKey}>
                {group.map((member, memberIdx) => {
                  return (
                    <Member key={memberIdx}>
                      <div>{member.name}</div>
                      <MemberInfo href={member.github} target="_blank">
                        GitHub
                      </MemberInfo>
                      <MemberInfo href={member.blog} target="_blank">
                        Blog
                      </MemberInfo>
                    </Member>
                  );
                })}
              </MemberGroup>
            );
          })}
        </MemeberWrapper>
        <Detail>실제 운영되는 사이트가 아닙니다</Detail>
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
  position: relative;

  @media (max-width: 768px) {
    display: ${(props) => (props.isVisible ? `flex` : `none`)};
    height: 230px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const LogoImg = styled.img`
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;

  @media (max-width: 480px) {
    top: 10px;
    left: 46px;
  }
`;

const LineHr = styled.hr`
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MemeberWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    padding-top: 70px;
  }
`;

const MemberGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  padding-top: 55px;

  @media (max-width: 768px) {
    padding-top: 70px;
  }

  @media (max-width: 480px) {
    padding-top: 0;
    width: 40%;

    :first-child {
      margin-bottom: 5px;
    }
  }
`;

const Member = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div,
  a {
    font-family: 'IBM Plex Sans KR', sans-serif;

    :nth-child(2) {
      margin-top: 30px;
    }
    :last-child {
      margin-top: 5px;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const MemberInfo = styled.a`
  display: block;
  text-decoration: none;
  color: var(--white);

  @media (max-width: 768px) {
    display: none;
  }
`;

const Detail = styled.div`
  text-align: center;

  @media (max-width: 480px) {
    text-align: left;
  }
`;
