import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomAside from '../components/custom/CustomAside';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import { TextButton } from '../components/commons/ModalDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
import useGET from '../util/useGET';
import { initializeCustom } from '../reducers/customReducer';

function Custom() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(['id', 'ASC']);
  const [searchWord, setSearchWord] = useState('');
  const [path, setPath] = useState('?page=1&sort=id&dir=ASC');
  const [res, isPending, error] = useGET(`/products${path}`);
  const { custom } = useSelector((state) => state.customReducer);
  const dispatch = useDispatch();

  const searchProduct = () => {
    setPage(1);
    getProducts();
  };

  const sortProducts = (select) => {
    setSearchWord('');
    setPage(1);
    setSortBy(select.split('/'));
  };

  const getProducts = () => {
    if (!searchWord)
      setPath(`?page=${page}&sort=${sortBy[0]}&dir=${sortBy[1]}`);
    else setPath(`/search?page=${page}&name=${searchWord}`);
  };

  useEffect(() => {
    getProducts();
  }, [page, sortBy]);

  const totalQuantity = custom.products.reduce((a, c) => a + c.quantity, 0);
  const productsId = custom.products.map((product) => product.productId);
  const productInCustom = (id) => {
    return productsId.indexOf(id);
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res.data}>
      <CustomWrapDiv className="margininside">
        <CustomTitleDiv>
          <h1>커스텀 밀박스</h1>
          <TextButton
            onClick={() => dispatch(initializeCustom())}
            className="linkstyle"
          >
            다시 담기
          </TextButton>
        </CustomTitleDiv>
        <CustomSelectDiv>
          <ElementsContainerDiv>
            <FilterSearchDiv
              sortProducts={sortProducts}
              searchSubject={searchProduct}
              setSearchWord={setSearchWord}
            />
            <BoxElementCardUl>
              {res?.data?.map((product) => (
                <li key={product.productId}>
                  <BoxElementCardDiv
                    product={product}
                    quantity={
                      custom.products[productInCustom(product.productId)]
                        ?.quantity
                    }
                    totalQuantity={totalQuantity}
                  />
                </li>
              ))}
              {/* <li>
                <BoxElementCardDiv />
              </li> */}
            </BoxElementCardUl>
            <PaginationUl
              page={res?.pageInfo?.page}
              totalpage={res?.pageInfo?.totalPages}
              setPage={setPage}
            />
          </ElementsContainerDiv>
          <CustomAside custom={custom} />
        </CustomSelectDiv>
      </CustomWrapDiv>
    </GetTemplate>
  );
}

export default Custom;

const CustomWrapDiv = styled(MealBoxesWrapDiv)`
  position: relative;
  @media screen and (max-width: 480px) {
    min-height: calc(100vh - 50px - 5rem);
    padding-bottom: 76px;
  }
`;
const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CustomTitleDiv = styled(CustomSelectDiv)`
  align-items: flex-end;

  > button {
    margin-bottom: 1rem;
  }
`;
const ElementsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  width: 60%;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const BoxElementCardUl = styled.ul`
  list-style: none;
  margin-bottom: -10px;
`;
