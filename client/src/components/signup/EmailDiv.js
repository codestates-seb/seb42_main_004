import styled from 'styled-components';

function EmailDiv({ pathName }) {
  return (
    <ContentDiv>
      <div>
        {pathName === 'complete' ? (
          <h1>이메일 인증이 완료되었습니다</h1>
        ) : (
          <h1>이메일을 확인해주세요</h1>
        )}
      </div>
    </ContentDiv>
  );
}

export default EmailDiv;

const ContentDiv = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--signature);
  }
`;
