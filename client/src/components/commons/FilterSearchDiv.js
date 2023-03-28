import styled from 'styled-components';
import FilterSelect from './FilterSelect';
import SearchBarDiv from './SearchBarDiv';

function FilterSearchDiv({ sortSubject, placeholder, toSearchBarDiv }) {
  return (
    <FilterSearchWrapDiv>
      <FilterSelect sortSubject={sortSubject} />
      <SearchBarDiv placeholder={placeholder} {...toSearchBarDiv} />
    </FilterSearchWrapDiv>
  );
}

export default FilterSearchDiv;

const FilterSearchWrapDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
