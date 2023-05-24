import styled from 'styled-components';

function DietInfo({ plan }) {
  let { kcal, goalWeight, goalWeightLoss } = plan;

  return (
    <DietInfoWrapper>
      <Info>
        <div>일일 칼로리</div>
        <div>{kcal}kcal</div>
      </Info>
      <Info>
        <div>예상 체중</div>
        <div>{goalWeight}kg</div>
      </Info>
      <Info>
        <div>목표 감량</div>
        <div>{goalWeightLoss}kg</div>
      </Info>
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

const Info = styled.div`
  > div:last-child {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-weight: 900;
  }
`;
