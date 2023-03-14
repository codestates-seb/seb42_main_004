import { useEffect, useState } from 'react';
import styled from 'styled-components';
import InputLabelDiv from './InputLabelDiv';
import MainButton from './MainButton';

function ModalDiv() {
  const [imgInput, setImgInput] = useState();
  const [imgInputBuffer, setImgInputBuffer] = useState();
  const [productInfo, setProductInfo] = useState({
    name: '',
    calorie: '',
    capacity: '',
    price: '',
  });

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
    <ModalContainerDiv>
      <ModalContentDiv>
        <ModalImgLabel htmlFor="file" className="shadow" img={imgInputBuffer}>
          이미지
          <br />
          추가
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
          />
          <InputLabelDiv
            label="열량"
            id="calorie"
            value={productInfo.calorie.toLocaleString('ko-KR')}
            onChange={inputHandler('calorie')}
            unit="kcal/10g"
          />
          <InputLabelDiv
            label="용량"
            id="capacity"
            value={productInfo.capacity.toLocaleString('ko-KR')}
            onChange={inputHandler('capacity')}
            unit="g"
          />
          <InputLabelDiv
            label="금액"
            id="price"
            value={productInfo.price.toLocaleString('ko-KR')}
            onChange={inputHandler('price')}
            unit="원"
          />
          <MainButton name="밀박스 추가하기" />
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60vw;
  min-height: 50vh;
  background-color: var(--body_beige);
  padding: 1rem;
  border-radius: 10px;
  font-weight: bold;
`;
const ModalImgLabel = styled.label`
  display: flex;
  justify-content: ${(props) => (props.img ? 'end' : 'center')};
  align-items: ${(props) => (props.img ? 'end' : 'center')};
  text-align: ${(props) => (props.img ? 'right' : 'center')};
  width: 20%;
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
