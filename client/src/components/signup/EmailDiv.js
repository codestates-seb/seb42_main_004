import styled from 'styled-components';

function EmailDiv({ pathName }) {
  return (
    <ContentDiv>
      <div>
        {pathName === 'complete' ? (
          <h2>이메일 인증이 완료되었습니다.</h2>
        ) : (
          <>
            <h2>myungju030@gmail.com로 이메일을 발송했습니다.</h2>
            <h2>이메일을 확인해주세요.</h2>
          </>
        )}
      </div>
    </ContentDiv>
  );
}

export default EmailDiv;

const ContentDiv = styled.div`
  width: 60%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--signature);
    background-color: var(--white_020);
  }
`;
