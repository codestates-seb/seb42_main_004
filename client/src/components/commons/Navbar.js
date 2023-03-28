import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import profile from '../../assets/profile.png';
import goToCustom from '../../util/goToCustom';

function Navbar({
  isLogin,
  name,
  imagePath,
  handleClick,
  handleLogout,
  navigate,
}) {
  return (
    <ModalContainerDiv onClick={handleClick}>
      <NavDiv onClick={(e) => e.stopPropagation()}>
        <NavUl onClick={handleClick}>
          {isLogin ? (
            <li>
              <Button onClick={() => navigate('/myinfo')}>
                <Img src={imagePath || profile} alt="profile" />
                <IdDiv>
                  <Name>{name}</Name>님
                </IdDiv>
                <IoIosArrowForward size={15} />
              </Button>
            </li>
          ) : (
            <li>
              <Button onClick={() => navigate('/login')}>
                <BsFillPersonFill size={25} />
                <IdDiv> 로그인 해주세요</IdDiv>
                <IoIosArrowForward size={25} />
              </Button>
            </li>
          )}
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
          {isLogin ? (
            <li>
              <Button onClick={handleLogout}>
                <FiLogOut size={25} />
                <IdDiv>로그아웃</IdDiv>
              </Button>
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
  padding-top: 50px;
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
    height: 80px;
    display: flex;
    justify-content: center;

    &:first-child {
      align-items: center;
      flex-basis: 130px;
      border-bottom: 1px solid var(--black);
    }

    &:last-child {
      margin: 40px 0px;
    }

    button {
      width: 100%;
      border: none;
      background-color: transparent;
      font-size: 1.1rem;
    }
  }
`;
const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const IdDiv = styled.span`
  padding: 0px 0.5rem;
  font-family: 'IBM Plex Sans KR', sans-serif;
  font-size: 1.3rem;
`;
const Name = styled.span`
  font-family: 'IBM Plex Sans KR', sans-serif;
  margin-right: 0.2rem;
  font-size: 1.5rem;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
`;
