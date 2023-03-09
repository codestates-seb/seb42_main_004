import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
// import { BsFillPersonFill } from 'react-icons/bs';
import { TfiMenu } from 'react-icons/tfi';
import logo from '../../assets/logo.png';
import MainButton from './MainButton';

function Header() {
  return (
    <header>
      <HeaderDiv className="marginbase shadow">
        <nav className="margininside">
          <MenuDiv>
            <MenuIcon size={30} />
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
              {/* <BsFillPersonFill size={30} /> */}
            </li>
            <li>
              <FaShoppingCart size={30} />
            </li>
          </IconsUl>
        </nav>
      </HeaderDiv>
      <NavDiv>cds</NavDiv>
    </header>
  );
}

export default Header;

const HeaderDiv = styled.div`
  height: 70px;
  background-color: var(--head_brown);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  > nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  img {
    cursor: pointer;
  }

  ul {
    padding: 0;
    list-style: none;

    > li {
      cursor: pointer;
    }
  }
`;
const MenuDiv = styled.div`
  display: flex;
  align-items: center;
`;
const MenuIcon = styled(TfiMenu)`
  margin: 0px 20px;

  @media (min-width: 768px) {
    display: none;
  }
`;
const NavDiv = styled.div`
  width: 300px;
  height: 100vh;
  position: fixed;
  background-color: var(--head_brown);
`;
const MenuUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;

  > li {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.2em;

    @media (max-width: 821px) {
      font-size: 1em;
    }
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

  button {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
