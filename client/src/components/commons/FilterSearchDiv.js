import styled from 'styled-components';
import FilterSelect from './FilterSelect';
import SearchBarDiv from './SearchBarDiv';

function FilterSearchDiv() {
  return (
    <FilterSearchWrapDiv>
      <FilterSelect />
      <SearchBarDiv placeholder="고구마" />
    </FilterSearchWrapDiv>
  );
}

export default FilterSearchDiv;

const FilterSearchWrapDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
