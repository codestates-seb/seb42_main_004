import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CartCounter from './CartCounter';
import MainButton from './MainButton';
import Navbar from './Navbar';
import { setAuth } from '../../reducers/authReducer';
import { initializeCart } from '../../reducers/cartReducer';
import { FaShoppingCart } from 'react-icons/fa';
import { TfiMenu } from 'react-icons/tfi';
import logo from '../../assets/logo_black.png';

function Header() {
  const [isNav, setIsNav] = useState(false);
  const { isLogin, user, admin } = useSelector((state) => state.authReducer); // admin 삭제 예정
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
          tokenExpirationDate: '',
          user: {},
          roles: [],
        })
      );
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
              <HeaderLink to="/survey/question/1">한끼밀 추천받기</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/custom">커스텀 밀박스 만들기</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/mealboxes">전체 상품 보기</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/products">구성품 알아보기</HeaderLink>
            </li>
          </MenuUl>
          <IconsUl>
            <li>
              {isLogin ? (
                <MainButton handler={handleLogout} name="Logout" />
              ) : (
                <MainButton handler={() => navigate('/login')} name="Login" />
              )}
            </li>
            <li>
              {isLogin ? null : (
                <MainButton handler={() => navigate('/signup')} name="Signup" />
              )}
            </li>
            <li>
              <FaShoppingCart
                size={25}
                onClick={() => {
                  navigate('/cart');
                }}
              />
              <CartCounter />
            </li>
          </IconsUl>
        </nav>
      </HeaderDiv>
      {isNav ? (
        <Navbar
          isLogin={isLogin}
          user={user}
          handleClick={handleClick}
          handleLogout={handleLogout}
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
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const IconsUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  > * {
    margin: 0px 8px;
  }

  > li:last-child {
    position: relative;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const HeaderLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: var(--black);
  font-family: 'IBM Plex Sans KR', sans-serif;
`;
