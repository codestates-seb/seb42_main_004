import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainButton from './MainButton';
import InputLabelDiv from './InputLabelDiv';
import { initializeCustom } from '../../reducers/customReducer';
import patchData from '../../util/patchData';
import postData from '../../util/postData';

function ModalDiv({ closeModal, mealBox, product }) {
  const [imgInput, setImgInput] = useState();
  const [imgInputBuffer, setImgInputBuffer] = useState();
  const subject = mealBox ? mealBox : product;
  const [subjectInfo, setSubjectInfo] = useState(subject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjectInputHandler = (key) => (e) => {
    let value = e.target.value;
    if (key !== 'name') {
      let lastLetter = Number(e.target.value.slice(-1));
      if (e.target.value === '0' || Number.isNaN(lastLetter)) return;
      else {
        value = Number(value.replaceAll(',', ''));
      }
    }
    setSubjectInfo({ ...subjectInfo, [key]: value });
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

  const mealBoxReq = () => {
    const data = { ...subjectInfo };
    if (!data.name) return;
    let uri = '/admin/mealboxes';
    const id = subjectInfo.mealBoxId;
    data.products = data.products.forEach((product) => delete product.name);

    const haveIdReq = (haveId) => {
      let func = haveId ? patchData : postData;
      func(uri, data)
        .then(() => {
          dispatch(initializeCustom());
          alert(`${data.name}이 ${haveId ? '수정' : '추가'}되었습니다.`);
          navigate('/');
        })
        .catch(() => alert('등록에 실패했습니다\n관리자에게 문의해주세요.'));
    };

    if (id) {
      uri += `/${id}`;
      delete data.mealBoxId;
      haveIdReq(true);
    } else {
      haveIdReq(false);
    }
  };

  const productReq = () => {
    const data = { ...subjectInfo };
    if (
      !data.name ||
      data.weight === undefined ||
      data.kcal === undefined ||
      data.price === undefined
    )
      return;

    let uri = '/admin/products';
    const id = subjectInfo.productId;

    const haveIdReq = (haveId) => {
      let func = haveId ? patchData : postData;
      func(uri, data)
        .then(() => {
          alert(`${data.name}이 ${haveId ? '수정' : '추가'}되었습니다.`);
          navigate('/');
        })
        .catch(() => alert('등록에 실패했습니다\n관리자에게 문의해주세요.'));
    };

    if (id) {
      uri += `/${id}`;
      delete data.productId;
      haveIdReq(true);
    } else {
      haveIdReq(false);
    }
  };

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
            value={subjectInfo.name}
            onChange={subjectInputHandler('name')}
            placeholder="밀박스A"
            maxLength={20}
          />
          <InputLabelDiv
            label="열량"
            id="kcal"
            value={subjectInfo.kcal.toLocaleString('ko-KR')}
            onChange={product && subjectInputHandler('kcal')}
            unit="kcal/10g"
            maxLength={5}
            disabled={mealBox && 1}
          />
          <InputLabelDiv
            label="용량"
            id="weight"
            value={subjectInfo.weight.toLocaleString('ko-KR')}
            onChange={product && subjectInputHandler('weight')}
            unit="g"
            maxLength={5}
            disabled={mealBox && 1}
          />
          <InputLabelDiv
            label="금액"
            id="price"
            value={subjectInfo.price.toLocaleString('ko-KR')}
            onChange={product && subjectInputHandler('price')}
            unit="원"
            maxLength={6}
            disabled={mealBox && 1}
          />
          <MainButton
            name={`${mealBox ? '밀박스' : '구성품'} ${
              subject?.id ? '수정' : '추가'
            }하기`}
            handler={mealBox ? mealBoxReq : productReq}
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
    margin: 50px 0 0;
    width: 100vw;
    height: calc(100vh - 50px);
    flex-direction: column;
    border-radius: 0px;
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
  min-width: 150px;
  min-height: 150px;
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

  @media (max-width: 480px) {
    min-height: 0;
  }
`;
