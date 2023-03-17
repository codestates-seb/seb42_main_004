import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputLabelDiv from './InputLabelDiv';
import MainButton from './MainButton';

function ModalDiv({ closeModal, mealBox, boxElement }) {
  const [imgInput, setImgInput] = useState();
  const [imgInputBuffer, setImgInputBuffer] = useState();
  const [productInfo, setProductInfo] = useState({
    name: '',
    kcal: '',
    weight: '',
    price: '',
  });
  const subject = mealBox ? mealBox : boxElement;

  const inputHandler = (key) => (e) => {
    let value = e.target.value;
    if (key !== 'name') {
      let lastLetter = Number(e.target.value.slice(-1));
      if (e.target.value === '0' || Number.isNaN(lastLetter)) return;
      else {
        value = Number(value.replaceAll(',', ''));
      }
    }
    setProductInfo({ ...productInfo, [key]: value });
  };
  // console.log(imgInput[0]);

  useEffect(() => {
    let reader = new FileReader();
    if (imgInput) {
      reader.readAsDataURL(imgInput);
      reader.onloadend = () => {
        setImgInputBuffer(reader.result);
      };
    } else {
      setImgInputBuffer(null);
    }
  }, [imgInput]);

  return (
    <ModalContainerDiv onClick={closeModal}>
      <ModalContentDiv onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={closeModal}>&#10005;</ModalCloseButton>
        <ModalImgLabel htmlFor="file" className="shadow" img={imgInputBuffer}>
          이미지
          {imgInputBuffer ? (
            ' 수정'
          ) : (
            <>
              <br />
              추가
            </>
          )}
          <input
            id="file"
            type="file"
            accept="image/*"
            onInput={(e) => setImgInput(e.target.files[0])}
          />
        </ModalImgLabel>
        <ModalTextDiv>
          <InputLabelDiv
            label="제품명"
            id="name"
            value={productInfo.name}
            onChange={inputHandler('name')}
            placeholder="밀박스A"
            maxLength={20}
          />
          <InputLabelDiv
            label="열량"
            id="kcal"
            value={productInfo.kcal.toLocaleString('ko-KR')}
            onChange={boxElement && inputHandler('kcal')}
            unit="kcal/10g"
            maxLength={5}
            disabled={mealBox && 1}
          />
          <InputLabelDiv
            label="용량"
            id="weight"
            value={productInfo.weight.toLocaleString('ko-KR')}
            onChange={boxElement && inputHandler('weight')}
            unit="g"
            maxLength={5}
            disabled={mealBox && 1}
          />
          <InputLabelDiv
            label="금액"
            id="price"
            value={productInfo.price.toLocaleString('ko-KR')}
            onChange={boxElement && inputHandler('price')}
            unit="원"
            maxLength={6}
            disabled={mealBox && 1}
          />
          <MainButton
            name={`${mealBox ? '밀박스' : '구성품'} ${
              subject?.id ? '수정' : '추가'
            }하기`}
          />
        </ModalTextDiv>
      </ModalContentDiv>
    </ModalContainerDiv>
  );
}

export default ModalDiv;

const ModalContainerDiv = styled.div`
  z-index: 20;
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--gray_070);
  width: 100vw;
  height: 100vh;
`;
const ModalContentDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60vw;
  min-height: 50vh;
  background-color: var(--body_beige);
  padding: 1rem;
  border-radius: 10px;
  font-weight: bold;

  @media (max-width: 480px) {
    padding: 50px 0 0;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
  }
`;
export const TextButton = styled.button`
  font-weight: bold;
  border: none;
  background: none;
  padding: 2px;
`;
const ModalCloseButton = styled(TextButton)`
  position: absolute;
  right: 0;
  top: 0;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: normal;
`;
const ModalImgLabel = styled.label`
  display: flex;
  justify-content: ${(props) => (props.img ? 'start' : 'center')};
  align-items: ${(props) => (props.img ? 'start' : 'center')};
  text-align: ${(props) => (props.img ? 'left' : 'center')};
  min-width: 100px;
  min-height: 100px;
  width: 12vw;
  height: 12vw;
  border-radius: 4px;
  margin: 2%;
  padding: 0.5rem;
  background-color: var(${(props) => (props.img ? '--white' : '--gray')});
  background-image: url(${(props) => props.img && props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  > input {
    position: absolute;
    width: 0;
  }

  @media (max-width: 480px) {
    width: 35vw;
    height: 35vw;
  }
`;
const ModalTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 25%;
  min-height: 50%;
  margin: 2%;

  > button {
    font-size: 1rem !important;
    width: 100%;
    padding: 0.7rem;
    margin-top: 0.7rem;
    height: auto;
    max-height: 3.5rem;
    word-break: keep-all;
    color: var(--white);
    font-weight: inherit;
  }

  > label {
    width: 100%;
    margin-bottom: 0.3rem;
  }
`;
