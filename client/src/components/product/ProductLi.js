import { useState } from 'react';
import styled from 'styled-components';
import ModalDiv, { TextButton } from '../commons/ModalDiv';
import blankbucket from '../../assets/blankbucket.png';
import deleteData from '../../util/deleteData';

function ProductLi({ product, admin, reload }) {
  const [openModal, setOpenModal] = useState(false);

  const deleteProduct = () => {
    if (
      window.confirm(
        `${product.name}을(를) 삭제하시겠습니까?\n삭제되면 복구할 수 없습니다.`
      )
    ) {
      deleteData(`/admin/mealboxes/${product.productId}`).then((res) => {
        if (res.status === 200) {
          alert(`${product.name}이(가) 삭제되었습니다.`);
          reload();
        } else {
          alert('삭제 실패.\n관리자에게 문의해주세요.');
        }
      });
    }
  };

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
            <TextButton onClick={deleteProduct}>삭제</TextButton>
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
