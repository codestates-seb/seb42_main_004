import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFilterSearch = (isMealBox, setPath) => {
  const navigate = useNavigate();

  const [searchWord, setSearchWord] = useState('');
  const [sortBy, setSortBy] = useState(['id', 'DESC']);
  const [errorWord, setErrorWord] = useState(searchWord);

  const [page, setPage] = useState(1);

  const searchSubject = () => {
    if (setPath) {
      setPage(1);
      setPath(paginationUrl(1));
    } else navigate(paginationUrl(1));
  };

  const paginationUrl = (page) => {
    setErrorWord(searchWord);
    if (isMealBox) {
      return searchWord
        ? `/mealboxes/search/detail?page=${page}&name=${searchWord}`
        : `/mealboxes?page=${page}&sort=${sortBy[0]}&dir=${sortBy[1]}`;
    } else {
      return searchWord
        ? `/products/search?page=${page}&name=${searchWord}`
        : `/products?page=${page}&sort=${sortBy[0]}&dir=${sortBy[1]}`;
    }
  };

  const sortSubject = (select) => {
    setSearchWord('');
    const sortBy = select.split('/');
    setSortBy(sortBy);
  };

  useEffect(() => {
    if (setPath) setPath(paginationUrl(page));
    else navigate(paginationUrl(1));
  }, [page, sortBy]);

  const toSearchBarDiv = { searchSubject, searchWord, setSearchWord };
  const toFilterSearchDiv = { sortSubject, toSearchBarDiv };

  return [toFilterSearchDiv, errorWord, paginationUrl, setPage];
};

export default useFilterSearch;
