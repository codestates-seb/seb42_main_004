import styled from 'styled-components';

const PaginationUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 2rem 0;
  align-self: end;
`;
const PaginationLi = styled.li`
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  color: var(--white);
  background-color: var(--signature_070);
  border-radius: 4px;
  padding: 0.4rem;
  margin-right: 0.5rem;
  min-width: 1.5rem;
`;

function Pagination({ nowpage, totalpage }) {
  // 1~3까지는 12345
  // 4부터 마지막-3까지는 45678
  // 마지막-3부터 마지막까지는 n
  const total = totalpage <= 5 ? totalpage : 5;
  let now;
  if (nowpage < 4) now = new Array(totalpage).fill(0).map((el, i) => i + 1);
  else if (totalpage - nowpage < 3) {
    now = new Array(totalpage).fill(0).map((el, i) => i + 1);
  } else now = totalpage;
  const totalLi = new Array(totalpage).fill(0);
  return (
    <PaginationUl>
      <PaginationLi>{'<<'}</PaginationLi>
      {totalLi.map((li, i) => (
        <PaginationLi key={i}>{i + 1}</PaginationLi>
      ))}
      <PaginationLi>{'>>'}</PaginationLi>
      {(total, now)}
    </PaginationUl>
  );
}

export default Pagination;
