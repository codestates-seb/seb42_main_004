import styled from 'styled-components';

function DietInfo({ kcal, weight, target }) {
  return (
    <DietInfoWrapper>
      <div>
        <div>일일 칼로리</div>
        <div>{kcal}kcal</div>
      </div>
      <div>
        <div>예상 체중</div>
        <div>{weight}kg</div>
      </div>
      <div>
        <div>목표 감량</div>
        <div>{target}kg</div>
      </div>
    </DietInfoWrapper>
  );
}

export default DietInfo;

const DietInfoWrapper = styled.div`
  display: flex;
  > div:not(:last-child) {
    margin-right: 10px;
  }
`;
