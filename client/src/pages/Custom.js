import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NoResultDiv from '../components/commons/NoResultDiv';
import CustomAside from '../components/custom/CustomAside';
import GetTemplate from '../components/commons/GetTemplate';
import PaginationUl from '../components/commons/PaginationUl';
import FilterSearchDiv from '../components/commons/FilterSearchDiv';
import BoxElementCardLi from '../components/custom/BoxElementCardLi';
import { TextButton } from '../components/commons/ModalDiv';
import { MealBoxesWrapDiv } from './AllBoxes';
import useGET from '../util/useGET';
import useFilterSearch from '../util/useFilterSearch';
import { initializeCustom } from '../reducers/customReducer';

function Custom() {
  const { custom } = useSelector((state) => state.customReducer);
  const { admin } = useSelector((state) => state.authReducer);
  const [path, setPath] = useState('/products?page=1&sort=id&dir=DESC');
  const [res, isPending, error] = useGET(path);
  const [openCustom, setOpenCustom] = useState(false);
  const [toFilterSearchDiv, notFoundWord, setPage] = useFilterSearch(
    false,
    setPath
  );
  const dispatch = useDispatch();

  const totalQuantity = custom.products.reduce((a, c) => a + c.quantity, 0);
  const productsId = custom.products.map((product) => product.productId);
  const productInCustom = (id) => {
    return productsId.indexOf(id);
  };
  const products = openCustom ? custom.products : res?.data;

  return (
    <GetTemplate
      isPending={isPending}
      error={error}
      res={res.data}
      title={`${admin ? '새로운' : '나만의'} 밀박스 만들기`}
    >
      <CustomWrapDiv className="margininside">
        <CustomTitleDiv>
          <h1>커스텀 밀박스</h1>
          <AsideButtonDiv>
            <TextButton
              onClick={() => setOpenCustom(!openCustom)}
              className="linkstyle"
            >
              선택된 목록 {openCustom ? '닫기' : '보기'}
            </TextButton>
            <TextButton
              onClick={() => dispatch(initializeCustom())}
              className="linkstyle"
            >
              다시 담기
            </TextButton>
          </AsideButtonDiv>
        </CustomTitleDiv>
        <CustomSelectDiv>
          <ElementsContainerDiv>
            <FilterSearchDiv placeholder="고구마" {...toFilterSearchDiv} />
            {products?.length !== 0 ? (
              <BoxElementCardUl>
                {products?.map((product) => (
                  <BoxElementCardLi
                    key={product.productId}
                    product={product}
                    quantity={
                      custom.products[productInCustom(product.productId)]
                        ?.quantity
                    }
                    totalQuantity={totalQuantity}
                  />
                ))}
              </BoxElementCardUl>
            ) : (
              <NoResultDiv
                search={(word) =>
                  setPath(`/products/search?page=1&name=${word}`)
                }
                notFoundWord={notFoundWord}
                replaceWord={'단백질쉐이크'}
              />
            )}
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
`;
const CustomSelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CustomTitleDiv = styled(CustomSelectDiv)`
  align-items: flex-end;
`;
const AsideButtonDiv = styled(CustomSelectDiv)`
  min-width: 30%;
`;
const ElementsContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  float: left;
  min-width: 60%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const BoxElementCardUl = styled.ul`
  list-style: none;
  margin-bottom: -10px;
`;
