import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextButton } from '../commons/ModalDiv';
// import blankbucket from '../../assets/blankbucket.png';
function ProductLi({ product }) {
  const { admin } = useSelector((state) => state.authReducer);

  return (
    <ContainerLi>
      <CardDiv className="shadow">
        <img src={product.imagePath} alt="blankbucket" />
        <div>{product.name}</div>
        <div>{product.weight.toLocaleString('ko-KR')}g(ml)</div>
        <div>{product.kcal.toLocaleString('ko-KR')}kcal</div>
        <div>{product.price.toLocaleString('ko-KR')}원</div>
        {admin && (
          <ButtonDiv>
            <TextButton>수정</TextButton>
            <TextButton>삭제</TextButton>
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
    margin-bottom: 1rem;
  }

  > div {
    font-weight: bold;
    height: 25px;
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
