import styled from 'styled-components';

function ElementItemLi({ el }) {
  return (
    <ContainerLi className="shadow">
      <div>{el}</div>
      <div>100kal</div>
      <div>10g</div>
      <div>300원</div>
    </ContainerLi>
  );
}

export default ElementItemLi;

const ContainerLi = styled.li`
  width: 240px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 1.2rem 1.2rem 0;
  background-color: var(--white);
`;
