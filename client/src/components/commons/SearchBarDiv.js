import styled from 'styled-components';
import { BiSearchAlt } from 'react-icons/bi';

function SearchBarDiv() {
  return (
    <SearchBarContainerDiv>
      <input
        className="inputstyle"
        maxLength={20}
        placeholder="healthy day 밀박스"
      />
      <button className="buttonstyle">검색</button>
      <BiSearchAlt />
    </SearchBarContainerDiv>
  );
}

export default SearchBarDiv;

const SearchBarContainerDiv = styled.div`
  display: flex;
  align-self: flex-end;
  position: relative;
  margin-bottom: 0.5rem;
  height: 2rem;

  > input {
    width: 100%;
    padding: 0.4rem;
    padding-left: 2rem;

    :focus {
      margin: -0.8px;
    }
  }

  > svg {
    position: absolute;
    margin: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    fill: var(--signature);
    top: 0;
  }

  > button {
    height: auto;
    word-break: keep-all;
    margin-left: 0.2rem;
    padding: 0.1rem 0.5rem;
    font-size: 1rem !important;
    border: none;
    background-color: var(--bucket_brown);

    :active {
      box-shadow: inset 2px 2px 0px var(--gray_070),
        inset -2px -2px 0px rgba(255, 255, 255, 0.5);
    }
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 0.8rem;
    width: 50%;
    align-self: flex-start;
    height: 3rem;

    > button {
      display: none;
    }

    > svg {
      width: 2rem;
      height: 2rem;
      margin: 0.5rem;
    }

    > input {
      padding-left: 3rem;
    }
  }
`;
