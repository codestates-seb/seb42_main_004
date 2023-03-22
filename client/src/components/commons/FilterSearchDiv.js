import styled from 'styled-components';
import FilterSelect from './FilterSelect';
import SearchBarDiv from './SearchBarDiv';

function FilterSearchDiv({ sortProducts, searchSubject, setSearchWord }) {
  return (
    <FilterSearchWrapDiv>
      <FilterSelect sortProducts={sortProducts} />
      <SearchBarDiv
        placeholder="고구마"
        searchSubject={searchSubject}
        setSearchWord={setSearchWord}
      />
    </FilterSearchWrapDiv>
  );
}

export default FilterSearchDiv;

const FilterSearchWrapDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
