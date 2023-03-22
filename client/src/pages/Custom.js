import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ModalDiv from '../components/commons/ModalDiv';
import CustomAside from '../components/custom/CustomAside';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import BoxElementCardDiv from '../components/custom/BoxElementCardDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
import useGET from '../util/useGET';
import postData from '../util/postData';
import { initializeCustom } from '../reducers/customReducer';

function Custom({ admin }) {
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(['id', 'ASC']);
  const [searchWord, setSearchWord] = useState('');
  const [path, setPath] = useState('?page=1&sort=id&dir=ASC');
  const [res, isPending, error] = useGET(`/products${path}`);
  const { custom } = useSelector((state) => state.customReducer);
  const navigate = useNavigate();
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

  const addCustomToCart = () => {
    const data = { ...custom };
    data.products = data.products.forEach((product) => delete product.name);
    postData(`/users/cart/custom`, data).then(() => {
      dispatch(initializeCustom());
      if (
        window.confirm(
          'Custom 밀박스가 장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?'
        )
      ) {
        navigate('/cart');
      } else navigate('/');
    });
  };

  const totalQuantity = custom.products.reduce((a, c) => a + c.quantity, 0);
  const productsId = custom.products.map((product) => product.productId);
  const productInCustom = (id) => {
    return productsId.indexOf(id);
  };

  return (
    <GetTemplate isPending={isPending} error={error} res={res.data}>
      <CustomWrapDiv className="margininside">
        {/* <ModalDiv
          mealBox={0}
          boxElement={1}
          closeModal={() => setOpenModal(false)}
        /> */}
        {admin && openModal && (
          <ModalDiv mealBox={custom} closeModal={() => setOpenModal(false)} />
        )}
        <h1>커스텀 밀박스</h1>
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
          <CustomAside
            admin={0}
            custom={custom}
            buttonClick={() => (admin ? setOpenModal(true) : addCustomToCart())}
          />
        </CustomSelectDiv>
      </CustomWrapDiv>
    </GetTemplate>
  );
}

export default Custom;

const CustomWrapDiv = styled(MealBoxesWrapDiv)`
  @media screen and (max-width: 480px) {
    min-height: calc(100vh - 50px - 5rem);
    padding-bottom: 76px;
  }
`;
const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
