import { useState } from 'react';
import styled from 'styled-components';
import ModalDiv, { TextButton } from '../commons/ModalDiv';
import blankbucket from '../../assets/blankbucket.png';
import deleteSubject from '../../util/deleteSubject';

function ProductLi({ product, admin, reload }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ContainerLi onClick={!product ? () => setOpenModal(true) : null}>
      {openModal && (
        <ModalDiv
          reload={reload}
          product={product}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <CardDiv className="shadow">
        <img
          src={product ? product.imagePath : blankbucket}
          alt="blankbucket"
        />
        <ProductInfoDiv>
          {product && (
            <>
              <div>{product.name}</div>
              <div>{product.weight.toLocaleString('ko-KR')}g(ml)</div>
              <div>{product.kcal.toLocaleString('ko-KR')}kcal</div>
              <div>{product.price.toLocaleString('ko-KR')}원</div>
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
      </CardDiv>
    </ContainerLi>
  );
}

export default ProductLi;

const ContainerLi = styled.li`
  width: 25%;

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 50%;
  }
`;
const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: var(--white);
  margin: 0.5rem;
  padding: 0.5rem;

  > img {
    width: 200px;
    height: 200px;
    margin-bottom: 0.5rem;
  }
`;
const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    font-weight: bold;
    width: fit-content;
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
