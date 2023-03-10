import { useState } from 'react';
import styled from 'styled-components';
import MainButton from './MainButton';
import logo from '../../assets/logo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { TfiMenu } from 'react-icons/tfi';
import { IoIosArrowForward } from 'react-icons/io';

function Header() {
  const [isNav, setIsNav] = useState(false);

  const handleClick = () => {
    setIsNav(!isNav);
  };

  return (
    <ContainerHeader>
      <HeaderDiv className="marginbase shadow">
        <nav className="margininside">
          <MenuDiv>
            <MenuIcon onClick={handleClick}>
              <TfiMenu size={25} />
            </MenuIcon>
            <img src={logo} alt="logo" />
          </MenuDiv>
          <MenuUl>
            <li>한끼밀 추천받기</li>
            <li>커스텀 밀박스 만들기</li>
            <li>전체 상품 보기</li>
            <li>구성품 알아보기</li>
          </MenuUl>
          <IconsUl>
            <li>
              <MainButton name="Login" />
              {/* <MainButton name="Logout" /> */}
            </li>
            <li>
              <MainButton name="Signup" />
              {/* <BsFillPersonFill size={25} /> */}
            </li>
            <li>
              <FaShoppingCart size={25} />
            </li>
          </IconsUl>
        </nav>
      </HeaderDiv>
      {isNav ? (
        <NavDiv>
          <NavUl>
            {/* <li>로그인 해주세요</li> */}
            <li>
              <BsFillPersonFill size={25} />
              <IdDiv>맹쥬님</IdDiv>
              <IoIosArrowForward size={15} />
            </li>
            <li>한끼밀 추천받기</li>
            <li>커스텀 밀박스 만들기</li>
            <li>전체 상품 보기</li>
            <li>구성품 알아보기</li>
            <li>로그아웃</li>
          </NavUl>
        </NavDiv>
      ) : null}
    </ContainerHeader>
  );
}

export default Header;

const ContainerHeader = styled.header`
  ul {
    padding: 0;
    list-style: none;

    > li {
      cursor: pointer;
      font-family: 'IBM Plex Sans KR', sans-serif;
    }
  }
`;
const HeaderDiv = styled.div`
  height: 70px;
  background-color: var(--head_brown) !important;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;

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
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    display: none;
  }
`;
const NavDiv = styled.div`
  width: 50vw;
  height: 100vh;
  position: fixed;
  z-index: 29;
  padding-top: 70px;
  background-color: var(--head_brown);

  @media (min-width: 768px) {
    display: none;
  }
`;
const NavUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  > li {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;

    &:first-child {
      align-items: center;
      flex-basis: 120px;
      padding: 40px;
      border-bottom: 1px solid var(--black);
      font-size: 1.5rem;
    }

    &:last-child {
      margin: 40px 0px;
    }
  }
`;
const MenuUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;

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

  button {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const IdDiv = styled.div`
  padding: 0px 1rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.5rem;
`;
