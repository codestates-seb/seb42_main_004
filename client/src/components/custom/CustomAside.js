import styled from 'styled-components';
import { AsideSignatureButton, AsideWrapper } from '../commons/CartAside';
import { TextButton } from '../commons/ModalDiv';

function CustomAside({ admin, bucket, buttonClick }) {
  return (
    <AsideWrapper>
      <InAsideBoxDiv>
        <TriangleDiv />
        <InAsideTitleDiv className="hidden">
          <h2>Custom</h2>
          <span>99,999kcal</span>
        </InAsideTitleDiv>
        {bucket && (
          <ul>
            <ElementInBucketLi>
              <span>{`${'오렌지주스'}`}</span>
              <span>
                {`${1}`}
                <TextButton className="linkstyle">&#10005;</TextButton>
              </span>
            </ElementInBucketLi>
            <ElementInBucketLi>
              <span>{`${'오렌지주스'}`}</span>
              <span>
                {`${1}`}
                <TextButton className="linkstyle">&#10005;</TextButton>
              </span>
            </ElementInBucketLi>
          </ul>
        )}
        <InAsidePriceDiv>
          <span>합계</span>
          <span>{`${'19,900'}원`}</span>
        </InAsidePriceDiv>
      </InAsideBoxDiv>

      <AsideSignatureButton onClick={buttonClick}>
        {!admin
          ? '장바구니 담기'
          : bucket?.id
          ? '밀박스 수정 진행하기'
          : '밀박스 생성 진행하기'}
      </AsideSignatureButton>
    </AsideWrapper>
  );
}

export default CustomAside;

const InAsideBoxDiv = styled.div`
  background-color: var(--bucket_brown);
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 0 2px var(--bucket_brown) inset,
    2px 2px 2px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    border-radius: 0;

    .hidden,
    > ul {
      display: none;
    }

    > div {
      margin: 0;
    }

    :hover {
      border-radius: 10px 10px 0 0;

      div:first-child {
        display: none;
      }

      .hidden {
        display: flex;
      }

      > ul {
        display: block;
      }
    }
  }
`;
const TriangleDiv = styled.div`
  display: none;
  width: 0;
  height: 0;
  border-bottom: calc(4px * 1.732) solid var(--bucket_brown);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  position: absolute;
  top: -6.4px;
  left: 50%;

  @media (max-width: 480px) {
    display: block;
  }
`;
const InAsideTitleDiv = styled.div`
  display: flex;
  align-items: baseline;

  > span {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    font-weight: normal;
  }

  > h2 {
    color: var(--white);
    list-style: none;
    min-height: 1vh;
  }
`;
const ElementInBucketLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font-size: 0.8rem;
    margin-right: -2px;

    > button {
      margin-left: 0.5rem;
    }
  }
`;
const InAsidePriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: -0.5rem;
`;
