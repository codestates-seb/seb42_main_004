import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CartCounter from './CartCounter';
import MainButton from './MainButton';
import Navbar from './Navbar';
import { setAuth, setEmail } from '../../reducers/authReducer';
import { initializeCart } from '../../reducers/cartReducer';
import { FaShoppingCart } from 'react-icons/fa';
import { TfiMenu } from 'react-icons/tfi';
import logo from '../../assets/logo_black.png';
import profile from '../../assets/profile.png';
import { setImage } from '../../reducers/imageReducer';
import goToCustom from '../../util/goToCustom';

function Header() {
  const [isNav, setIsNav] = useState(false);
  const { isLogin, user, admin } = useSelector((state) => state.authReducer); // admin 삭제 예정
  const { imagePath } = useSelector((state) => state.imageReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsNav(!isNav);
  };

  const handleLogout = () => {
    if (confirm('정말 로그아웃하시겠습니까?')) {
      localStorage.removeItem('accessToken');
      dispatch(
        setAuth({
          isLogin: false,
          accessToken: '',
          user: {},
          roles: [],
        })
      );
      dispatch(setEmail(''));
      dispatch(setImage(null));
      dispatch(initializeCart());
      window.location.reload();
    } else {
      return;
    }
  };

  console.log(`로그인: ${isLogin}`); // 삭제 예정
  console.log(`관리자: ${admin}`); // 삭제 예정

  return (
    <ContainerHeader>
      <HeaderDiv className="marginbase shadow">
        <nav className="margininside">
          <MenuDiv>
            <MenuIcon onClick={handleClick}>
              <TfiMenu size={25} />
            </MenuIcon>
            <LogoImg src={logo} alt="logo" onClick={() => navigate('/')} />
          </MenuDiv>
          <MenuUl>
            <li>
              <button onClick={() => navigate('/survey/question/1')}>
                한끼밀 추천받기
              </button>
            </li>
            <li>
              <button onClick={goToCustom()}>커스텀 밀박스 만들기</button>
            </li>
            <li>
              <button onClick={() => navigate('/mealboxes')}>
                전체 상품 보기
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/products')}>
                구성품 알아보기
              </button>
            </li>
          </MenuUl>
          <IconsUl>
            <li>
              {isLogin ? (
                <ProfileSpan>
                  <button onClick={() => navigate('/myinfo')}>
                    <Img src={imagePath || profile} alt="profile" />
                  </button>
                </ProfileSpan>
              ) : null}
            </li>
            <li>
              {isLogin ? (
                <LogoutSpan>
                  <MainButton handler={handleLogout} name="로그아웃" />
                </LogoutSpan>
              ) : (
                <LoginSpan>
                  <MainButton
                    handler={() => navigate('/login')}
                    name="로그인"
                  />
                </LoginSpan>
              )}
            </li>
            <li>
              {isLogin ? null : (
                <SignupSpan>
                  <MainButton
                    handler={() => navigate('/signup')}
                    name="회원가입"
                  />
                </SignupSpan>
              )}
            </li>
            <li>
              <CartSpan>
                <button onClick={() => navigate('/cart')}>
                  <FaShoppingCart size={25} />
                  <CartCounter />
                </button>
              </CartSpan>
            </li>
          </IconsUl>
        </nav>
      </HeaderDiv>
      {isNav ? (
        <Navbar
          isLogin={isLogin}
          user={user}
          imagePath={imagePath}
          handleClick={handleClick}
          handleLogout={handleLogout}
          navigate={navigate}
        />
      ) : null}
    </ContainerHeader>
  );
}

export default Header;

const ContainerHeader = styled.header`
  ul {
    padding: 0;
    list-style: none;

    > li > * {
      cursor: pointer;
      font-family: 'IBM Plex Sans KR', sans-serif;
    }
  }
`;
const HeaderDiv = styled.div`
  height: 50px;
  background-color: var(--head_brown) !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 36;

  > nav {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const MenuDiv = styled.div`
  display: flex;
  align-items: center;

  > * {
    cursor: pointer;
  }
`;
const MenuIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    display: none;
  }
`;
const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;
const MenuUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;

  > li {
    flex-basis: 120px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const IconsUl = styled.ul`
  display: flex;
  flex-direction: row;

  > li {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const ProfileSpan = styled.span`
  width: 50px;
  height: 100%;
  margin-right: 1rem;

  > button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CartSpan = styled.span`
  width: 50px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;

  > button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;

    > :last-child {
      position: absolute;
      top: 7px;
      right: 6px;
    }
  }
`;
const LogoutSpan = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;
const LoginSpan = styled.span`
  margin-right: 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`;
const SignupSpan = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
`;
