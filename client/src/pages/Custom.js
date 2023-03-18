import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModalDiv from '../components/commons/ModalDiv';
import CustomAside from '../components/custom/CustomAside';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
// import useGET from '../util/useGET';

function Custom({ admin }) {
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  // const [products, isPending, error] = useGET(`/products/${page}`);
  const navigate = useNavigate();

  return (
    <CustomWrapDiv className="margininside">
      <ModalDiv
        mealBox={0}
        boxElement={1}
        closeModal={() => setOpenModal(false)}
      />
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
          <PaginationUl page={page} totalpage={3} setPage={setPage} />
        </ElementsContainerDiv>
        <CustomAside
          admin={0}
          bucket={1}
          buttonClick={
            admin ? () => setOpenModal(true) : () => navigate('/cart')
          }
        />
      </CustomSelectDiv>
    </CustomWrapDiv>
  );
}

export default Custom;

const CustomWrapDiv = styled(MealBoxesWrapDiv)`
  @media screen and (max-width: 480px) {
    min-height: calc(100vh - 50px - 5rem);
  }
`;
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
