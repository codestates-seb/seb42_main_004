import styled from 'styled-components';

function FilterSelect() {
  return (
    <Select type="select">
      <option value="newest">최신순</option>
      <option value="oldest">오래된 순</option>
      <option value="alphabet">가나다순</option>
      <option value="ralphabet">가나다 역순</option>
      <option value="lowkcal">칼로리 낮은 순</option>
      <option value="highkcal">칼로리 높은 순</option>
    </Select>
  );
}

export default FilterSelect;

const Select = styled.select`
  margin-bottom: 0.5rem;
  height: 2rem;
  border-radius: 4px;
  background-color: var(--white) !important;
  outline: none;

  :focus {
    border: 2px solid var(--signature);
    margin-right: -1.455px;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 0.8rem;
    width: 49%;
    height: 3rem;
  }
`;
