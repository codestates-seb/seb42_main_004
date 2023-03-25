import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';

function Navbar({ isLogin, user, handleClick, handleLogout }) {
  return (
    <ModalContainerDiv onClick={handleClick}>
      <NavDiv onClick={(e) => e.stopPropagation()}>
        <NavUl onClick={handleClick}>
          {isLogin ? (
            <li>
              <HeaderLink to="/myinfo">
                <BsFillPersonFill size={25} />
                <IdDiv>{user.name}님</IdDiv>
                <IoIosArrowForward size={15} />
              </HeaderLink>
            </li>
          ) : (
            <li>
              <HeaderLink to="/login">
                <BsFillPersonFill size={25} />
                로그인 해주세요
              </HeaderLink>
            </li>
          )}
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
          {isLogin ? (
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          ) : (
            <li></li>
          )}
        </NavUl>
      </NavDiv>
    </ModalContainerDiv>
  );
}

export default Navbar;

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

  @media (min-width: 768px) {
    display: none;
  }
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
    padding: 2rem;
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

    button {
      width: 100%;
      border: none;
      background-color: transparent;
    }
  }
`;
const IdDiv = styled.div`
  padding: 0px 1rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.5rem;
`;
const HeaderLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: var(--black);
  font-family: 'IBM Plex Sans KR', sans-serif;
`;
