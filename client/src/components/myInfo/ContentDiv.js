import styled from 'styled-components';

function ContentDiv({ name, content }) {
  return (
    <ContainerDiv>
      <TitleDiv>{name}</TitleDiv>
      <div>{content}</div>
    </ContainerDiv>
  );
}

export default ContentDiv;

const ContainerDiv = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > div:last-child {
    flex-grow: 1;
  }
`;
const TitleDiv = styled.div`
  flex-basis: 75px;
  margin-right: 1.5rem;
  display: flex;
  justify-content: flex-end;
  font-family: 'IBM Plex Sans KR', sans-serif;

  @media (max-width: 480px) {
    width: 80%;
    justify-content: flex-start;
    margin-right: 0;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 60%;
    justify-content: flex-start;
    margin-right: 0;
  }
`;
