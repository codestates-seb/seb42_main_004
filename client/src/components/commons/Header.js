import { useState } from 'react';
import styled from 'styled-components';
import MainButton from './MainButton';
import logo from '../../assets/logo_black.png';
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
            <LogoImg src={logo} alt="logo" />
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
        <ModalContainerDiv onClick={handleClick}>
          <NavDiv onClick={(e) => e.stopPropagation()}>
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
        </ModalContainerDiv>
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
const NavDiv = styled.div`
  width: 50vw;
  height: 100vh;
  position: fixed;
  z-index: 35;
  padding-top: 70px;
  background-color: var(--head_brown);
  animation-name: nav;
  animation-duration: 250ms;

  @media (min-width: 768px) {
    display: none;
  }

  @keyframes nav {
    from {
      width: 30vw;
    }
    to {
      width: 50vw;
    }
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
const IdDiv = styled.div`
  padding: 0px 1rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.5rem;
`;
const ModalContainerDiv = styled.div`
  z-index: 34;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: var(--gray_070);
  width: 100vw;
  height: 100vh;

  :hover {
    cursor: pointer;
  }
`;
