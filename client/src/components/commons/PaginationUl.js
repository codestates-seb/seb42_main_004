import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PaginationUl({ page, totalpage, url, setPage }) {
  const navigate = useNavigate();

  const total = totalpage < 5 ? totalpage : 5;
  let first;
  if (page < 4) first = 1;
  else if (totalpage - page < 3) first = totalpage - 4;
  else first = page - 2;
  const totalLi = new Array(total).fill(first).map((el, i) => el + i);

  return (
    <PaginationContainerUl>
      {!totalLi.includes(1) && (
        <PaginationLi
          onClick={() => (url ? navigate(`${url}/${1}`) : setPage(1))}
        >
          {'<<'}
        </PaginationLi>
      )}
      {totalLi.map((li, i) => (
        <PaginationLi
          key={i}
          now={li === page && 1}
          onClick={() =>
            url !== undefined ? navigate(`${url}/${li}`) : setPage(li)
          }
        >
          {li}
        </PaginationLi>
      ))}
      {!totalLi.includes(totalpage) && (
        <PaginationLi
          onClick={() =>
            url ? navigate(`${url}/${totalpage}`) : setPage(totalpage)
          }
        >
          {'>>'}
        </PaginationLi>
      )}
    </PaginationContainerUl>
  );
}

export default PaginationUl;

const PaginationContainerUl = styled.ul`
  list-style: none;
  display: flex;
  margin: 2rem -0.5rem 0;
  align-self: end;

  @media screen and (max-width: 480px) {
    align-self: center;
  }
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
