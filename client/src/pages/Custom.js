import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PaginationUl from '../components/commons/PaginationUl';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import ModalDiv from '../components/commons/ModalDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import CustomAside from '../components/custom/CustomAside';

function Custom({ admin }) {
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
          <FilterSearchDiv />
          <BoxElementCardUl>
            <li>
              <BoxElementCardDiv />
            </li>
          </BoxElementCardUl>
          <PaginationUl nowpage={1} totalpage={1} />
        </ElementsContainerDiv>
        <CustomAside
          admin={0}
          bucket={1}
          buttonClick={
            admin ? () => setOpenModal(true) : () => navigate('/cart')
          }
        />
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
const BoxElementCardUl = styled.ul`
  list-style: none;
  margin-bottom: -10px;
`;
