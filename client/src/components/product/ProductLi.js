import { useState } from 'react';
import styled from 'styled-components';
import ModalDiv, { TextButton } from '../commons/ModalDiv';
import blankbucket from '../../assets/blankbucket.png';
import deleteSubject from '../../util/deleteSubject';
import { MealBoxImg, MealBoxImgDiv } from '../allboxes/MealBoxCardLi';

function ProductLi({ product, admin, reload }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ContainerLi
      margin={!admin && 1}
      className="shadow"
      onClick={!product ? () => setOpenModal(true) : null}
    >
      {openModal && (
        <ModalDiv
          reload={reload}
          product={product}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <MealBoxImgDiv>
        <ProductImg
          src={product ? product.imagePath : blankbucket}
          alt="blankbucket"
        />
      </MealBoxImgDiv>
      <ProductInfoDiv margin={!admin && 1}>
        <h3>{product ? product.name : '구성품 추가하기'}</h3>
        {product && (
          <>
            <span>{product.weight.toLocaleString('ko-KR')}g(ml)</span>
            <span>{product.kcal.toLocaleString('ko-KR')}kcal</span>
            <span>{product.price.toLocaleString('ko-KR')}원</span>
          </>
        )}
      </ProductInfoDiv>
      {admin && product && (
        <ButtonDiv>
          <TextButton onClick={() => setOpenModal(true)}>수정</TextButton>
          <TextButton
            onClick={() =>
              deleteSubject('products', product.name, product.id, reload)
            }
          >
            삭제
          </TextButton>
        </ButtonDiv>
      )}
    </ContainerLi>
  );
}

export default ProductLi;

const ContainerLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  padding: 5%;
  background-color: var(--white);
  padding-bottom: ${(props) => props.margin && '2rem'};
`;
const ProductImg = styled(MealBoxImg)`
  padding: 10%;
`;
const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;

  > button {
    flex: 1;
  }
`;
