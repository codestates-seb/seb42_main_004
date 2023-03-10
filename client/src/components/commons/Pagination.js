import styled from 'styled-components';

function Pagination({ nowpage, totalpage, setNextPage }) {
  const total = totalpage <= 5 ? totalpage : 5;
  let now;
  if (nowpage < 4) now = 1;
  else if (totalpage - nowpage < 3) now = totalpage - 4;
  else now = nowpage - 2;
  const totalLi = new Array(total).fill(now).map((el, i) => el + i);

  return (
    <PaginationUl>
      {!totalLi.includes(1) && (
        <PaginationLi onClick={() => setNextPage(1)}>{'<<'}</PaginationLi>
      )}
      {totalLi.map((li, i) => (
        <PaginationLi
          key={i}
          now={li === nowpage && 1}
          onClick={() => setNextPage(li)}
        >
          {li}
        </PaginationLi>
      ))}
      {!totalLi.includes(totalpage) && (
        <PaginationLi onClick={() => setNextPage(totalpage)}>
          {'>>'}
        </PaginationLi>
      )}
    </PaginationUl>
  );
}

export default Pagination;

const PaginationUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 2rem -0.5rem;
  align-self: end;
`;
const PaginationLi = styled.li`
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: ${(props) => props.now && 'bold'};
  text-align: center;
  color: var(${(props) => (props.now ? '--white' : '--black')});
  background-color: var(
    ${(props) => (props.now ? '--bucket_brown' : '--head_brown')}
  );
  border-radius: 4px;
  padding: 0.4rem;
  margin-right: 0.5rem;
  min-width: 1.5rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
`;
