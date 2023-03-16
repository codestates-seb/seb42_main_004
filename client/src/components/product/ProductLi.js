import styled from 'styled-components';
import blankbucket from '../../assets/blankbucket.png';
function ProductLi({ el }) {
  return (
    <ContainerLi>
      <CardDiv className="shadow">
        <img src={blankbucket} alt="blankbucket" />
        <div>{el}</div>
        <div>100kal</div>
        <div>10g</div>
        <div>300원</div>
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

  > img {
    width: 200px;
    height: 200px;
    margin-bottom: 1rem;
  }

  > div {
    height: 25px;
  }
`;
