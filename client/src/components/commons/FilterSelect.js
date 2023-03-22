import styled from 'styled-components';

function FilterSelect({ sortProducts }) {
  return (
    <Select type="select" onChange={(e) => sortProducts(e.target.value)}>
      <option value="id/ASC">최신순</option>
      <option value="id/DESC">오래된 순</option>
      <option value="name/ASC">가나다순</option>
      <option value="name/DESC">가나다 역순</option>
      <option value="kcal/ASC">칼로리 낮은 순</option>
      <option value="kcal/DESC">칼로리 높은 순</option>
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
