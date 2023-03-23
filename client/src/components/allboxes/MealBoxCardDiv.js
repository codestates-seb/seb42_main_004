import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MainButton from '../commons/MainButton';
import blankbucket from '../../assets/blankbucket.png';
import postData from '../../util/postData';
import deleteData from '../../util/deleteData';
import goToCustom from '../../util/goToCustom';
import { addCartItem } from '../../reducers/cartReducer';
import { TextButton } from '../commons/ModalDiv';

function MealBoxCardDiv({ mealBox, custom, login }) {
  const [notification, setNotification] = useState(false);
  const { admin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const addToCart = async () => {
    if (login) {
      await postData(`/users/cart`, { mealboxId: mealBox.mealboxId });
    } else {
      dispatch(addCartItem(mealBox));
    }
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  const deleteMealBox = () => {
    if (
      window.confirm(
        `${mealBox.name}을 삭제하시겠습니까?\n삭제되면 복구할 수 없습니다.`
      )
    ) {
      deleteData(`/admin/mealboxes/${mealBox.mealboxId}`)
        .then(() => alert(`${mealBox.name}이 삭제되었습니다.}`))
        .then(() => {
          window.location.reload();
        });
      console.log('삭제 완료');
    }
  };

  return (
    <MealBoxCardContainerDiv className="shadow">
      <MealBoxImgDiv className="shadow">
        {mealBox && (
          <p>
            <span>{mealBox.weight.toLocaleString('ko-KR')}g(ml)</span>
            <span>{mealBox.kcal.toLocaleString('ko-KR')}kcal</span>
          </p>
        )}
        <MealBoxImg alt="" src={custom ? blankbucket : mealBox.imagePath} />
        {mealBox && (
          <MealBoxDesUl>
            {mealBox.products.map((product) => (
              <MealBoxDesLi key={product.productId}>
                <span>{product.name}</span>
                <span>{product.weight.toLocaleString('ko-KR')}g(ml)</span>
                <span>{product.kcal.toLocaleString('ko-KR')}kcal</span>
              </MealBoxDesLi>
            ))}
          </MealBoxDesUl>
        )}
      </MealBoxImgDiv>
      <MealBoxH3 custom={custom && 1}>
        {custom ? `${admin ? '새로운' : '나만의'} 밀박스 만들기` : mealBox.name}
      </MealBoxH3>
      <MealBoxCardButtonDiv custom={custom && 1}>
        <MainButton
          handler={goToCustom(mealBox, admin)}
          name={!admin || custom ? '커스텀 하기' : '밀박스 수정'}
        />
        {!custom && (
          <>
            <MainButton
              handler={admin ? deleteMealBox : addToCart}
              name={admin ? '밀박스 삭제' : '장바구니 추가'}
            />
            <MainButton name={mealBox.price.toLocaleString('ko-KR') + '원'} />
          </>
        )}
        <NotificationDiv add={notification && 1}>
          {mealBox?.name}이(가) 장바구니에 추가되었습니다.
          <TextButton className="linkstyle">장바구니로 이동하기</TextButton>
        </NotificationDiv>
      </MealBoxCardButtonDiv>
    </MealBoxCardContainerDiv>
  );
}

export default MealBoxCardDiv;

export const MealBoxCardContainerDiv = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 5%;
  background-color: var(--head_brown);
`;
const MealBoxImgDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: var(--white);
  padding-bottom: 100%;

  > p {
    z-index: 10;
    display: flex;
    position: absolute;
    top: 0;
    width: 100%;
    justify-content: flex-end;
    margin-top: 0.5rem;

    > span {
      font-size: 0.8rem;
      margin-right: 0.5rem;
    }
  }
`;
const MealBoxImg = styled.img`
  max-width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: auto;
  padding: 2rem;
`;
const MealBoxDesUl = styled.ul`
  z-index: 9;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: var(--gray_070);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5%;
  opacity: 0;
  list-style: none;

  :hover {
    opacity: 1;
  }
`;
const MealBoxDesLi = styled.h3`
  width: 100%;
  display: flex;
  justify-content: space-between;
  word-break: keep-all;

  > span:first-child {
    flex: 1;
  }

  > span:not(:first-child) {
    flex: 0.5;
    text-align: right;
  }
`;
const MealBoxH3 = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  text-align: ${(props) => props.custom && 'center'};
`;
const MealBoxCardButtonDiv = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  > button {
    margin-right: 0.5rem;
    font-size: 1rem !important;
    width: 100%;
    padding: 0.7rem;
    height: auto;
    max-height: 3.5rem;
    word-break: keep-all;
  }

  > button:not(:last-child) {
    flex: 1;
  }

  button:nth-child(3) {
    flex: 0.7;
    cursor: default;
    margin-right: 0;

    :active {
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
    }
  }
`;
const NotificationDiv = styled.div`
  visibility: ${(props) => (props.add ? 'visible' : 'hidden')};
  transition: all 0.5s;
  position: absolute;
  z-index: 11;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 80%;
  background-color: var(--signature);
  color: var(--white);
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 0 0 2px var(--signature) inset, 2px 2px 2px rgba(0, 0, 0, 0.4);
  word-break: keep-all;
  text-align: center;

  ::before {
    content: '';
    border-bottom: calc(4px * 1.732) solid var(--signature);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    top: -6.4px;
    left: 50%;
  }
`;
