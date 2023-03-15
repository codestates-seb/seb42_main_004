import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PaginationUl from '../components/commons/PaginationUl';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import CartAside from '../components/commons/CartAside';
import SearchBarDiv from '../components/commons/SearchBarDiv';
import ModalDiv, { TextButton } from '../components/commons/ModalDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
import FilterSelect from '../components/commons/FilterSelect';

function Custom({ admin, mealBox }) {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <MealBoxesWrapDiv className="margininside">
      {/* <ModalDiv
        mealBox={0}
        boxElement={1}
        closeModal={() => setOpenModal(false)}
      /> */}
      {admin && openModal && (
        <ModalDiv closeModal={() => setOpenModal(false)} />
      )}
      <h1>커스텀 밀박스</h1>
      <CustomSelectDiv>
        <ElementsContainerDiv>
          <FilterSearchDiv>
            <FilterSelect />
            <SearchBarDiv placeholder="고구마" />
          </FilterSearchDiv>
          <BoxElementCardUl>
            <li>
              <BoxElementCardDiv />
            </li>
          </BoxElementCardUl>
          <PaginationUl nowpage={1} totalpage={1} />
        </ElementsContainerDiv>
        <CartAside
          type={
            admin
              ? '밀박스 생성 진행하기'
              : mealBox?.id
              ? '밀박스 수정 진행하기'
              : '장바구니 담기'
          }
          buttonClick={admin ? () => setOpenModal(true) : () => navigate('/')}
        >
          <InAsideH2>Custom</InAsideH2>
          <InAsideUl>
            <ElementInBucketLi>
              <span>{`${'오렌지주스'}`}</span>
              <span>
                {`${1}`}
                <TextButton className="linkstyle">&#10005;</TextButton>
              </span>
            </ElementInBucketLi>
            <ElementInBucketLi>
              <span>{`${'오렌지주스'}`}</span>
              <span>
                {`${1}`}
                <TextButton className="linkstyle">&#10005;</TextButton>
              </span>
            </ElementInBucketLi>
          </InAsideUl>
          <InAsideDiv>
            <span>합계</span>
            <span>{`${'19,900'}원`}</span>
          </InAsideDiv>
        </CartAside>
      </CustomSelectDiv>
    </MealBoxesWrapDiv>
  );
}

export default Custom;

const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ElementsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 60%;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const FilterSearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BoxElementCardUl = styled.ul`
  list-style: none;
  margin-bottom: -10px;
`;
const InAsideH2 = styled.h2`
  color: var(--white);
  list-style: none;
  min-height: 1vh;

  @media (max-width: 480px) {
    display: none;
  }
`;

const InAsideUl = styled.ul`
  @media (max-width: 480px) {
    display: none;
  }
`;

export const InAsideDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: -0.5rem;
`;

const ElementInBucketLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-size: 0.8rem;
    margin-right: -2px;

    > button {
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    border-radius: 0;
  }
`;
