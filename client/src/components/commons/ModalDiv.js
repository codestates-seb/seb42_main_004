import { useRef, useState } from 'react';
import styled from 'styled-components';
import MainButton from './MainButton';

function ModalDiv() {
  const imgRef = useRef();
  const [imgInput, setImgInput] = useState(imgRef.current?.value);
  console.log(imgInput);

  return (
    <ModalContainerDiv>
      <ModalContentDiv>
        <ModalImgLabel htmlFor="file" className="shadow" img={imgInput}>
          이미지
          <br />
          추가
          <input
            ref={imgRef}
            id="file"
            type="file"
            accept=".jpg, .jpeg, .gif, .bmp, .png, .webp, .avif"
            onInput={(e) => setImgInput(e.target.value)}
          />
        </ModalImgLabel>
        {/* <div>
          <label htmlFor="name">제품명</label>
          <input id="name" className="inputstyle"></input>
        </div>
        <div>
          <label htmlFor="calorie">열량(kcal/10g)</label>
          <input id="calorie" className="inputstyle"></input>
        </div>
        <div>
          <label htmlFor="capacity">용량</label>
          <input id="capacity" className="inputstyle"></input>
        </div>
        <div>
          <label htmlFor="price">금액</label>
          <input id="price" className="inputstyle"></input>
        </div>
        <div>
          <label htmlFor="des">설명(option)</label>
          <input id="des" className="inputstyle"></input>
        </div> */}
        <ModalTextDiv>
          <label htmlFor="name">
            제품명
            <input
              id="name"
              className="inputstyle"
              placeholder="예시 혹은 글자 제한"
            ></input>
          </label>
          <label htmlFor="calorie">
            열량(kcal/10g)
            <input
              id="calorie"
              className="inputstyle"
              placeholder="예시 혹은 글자 제한"
            ></input>
          </label>
          <label htmlFor="capacity">
            용량
            <input
              id="capacity"
              className="inputstyle"
              placeholder="예시 혹은 글자 제한"
            ></input>
          </label>
          <label htmlFor="price">
            금액
            <input
              id="price"
              className="inputstyle"
              placeholder="예시 혹은 글자 제한"
            ></input>
          </label>
          <label htmlFor="des">
            설명(option)
            <input
              id="des"
              className="inputstyle"
              placeholder="예시 혹은 글자 제한"
            ></input>
          </label>
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
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  min-width: 25%;
  min-height: 50%;
  margin: 2%;

  > label {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3rem;

    > input {
      padding: 0.2rem;
    }
  }

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
`;
