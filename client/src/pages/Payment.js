import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import GetTemplate from '../components/commons/GetTemplate';
import CartAside from '../components/commons/CartAside';
import PaymentUl from '../components/payment/PaymentUl';
import { deleteCartItem } from '../reducers/cartReducer';
import patchData from '../util/patchData';
import postData from '../util/postData';
import useGET from '../util/useGET';

function Payment() {
  const { orderId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    addressee: '',
    addresseePhoneNumber: '',
    deliveryDetailAddress: '',
    deliverySimpleAddress: '',
    deliveryZipCode: '',
    email: '',
    orderNumber: '',
    totalPrice: '',
    userDetailAddress: '',
    userPhoneNumber: '',
    userSimpleAddress: '',
    userZipCode: '',
    username: '',
  });
  const checkedCartMealBoxId = location.state
    ? location.state.checkedCartMealBoxId
    : [];
  const [same, setSame] = useState(false);
  const [save, setSave] = useState(false);
  const [res, isPending, error] = useGET(`/orders/checkout/${orderId}`);

  useEffect(() => {
    if (res) {
      setInputValue(res);
    }
  }, [res]);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const handleClick = () => {
    if (same) {
      patchData(`/orders/delivery/${orderId}`, {
        addressee: inputValue.username,
        zipCode: inputValue.userZipCode,
        simpleAddress: inputValue.userSimpleAddress,
        detailAddress: inputValue.userDetailAddress,
        phoneNumber: inputValue.userPhoneNumber,
      }).then((data) => {
        if (data.status === 200) {
          onClickPayment();
        } else {
          alert('배송지 정보를 확인해주세요.');
        }
      });
    } else {
      patchData(`/orders/delivery/${orderId}`, {
        addressee: inputValue.addressee,
        zipCode: inputValue.deliveryZipCode,
        simpleAddress: inputValue.deliverySimpleAddress,
        detailAddress: inputValue.deliveryDetailAddress,
        phoneNumber: inputValue.addresseePhoneNumber,
      }).then((data) => {
        if (data.status === 200) {
          onClickPayment();
        } else {
          alert('배송지 정보를 확인해주세요.');
        }
      });
    }
  };

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp88722047');
    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: inputValue.orderNumber,
      name: '한끼밀 밀박스',
      amount: inputValue.totalPrice,
      buyer_name: inputValue.username,
      buyer_tel: inputValue.userPhoneNumber,
      buyer_email: inputValue.email,
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const { success, error_msg } = response;
    if (success) {
      postData('/payments/validation', {
        impUid: response.imp_uid,
        merchantUid: response.merchant_uid,
      }).then((data) => {
        if (data.status === 200) {
          if (same && save) {
            patchData('/users', {
              name: inputValue.username,
              phoneNumber: inputValue.userPhoneNumber,
              address: {
                zipCode: inputValue.userZipCode,
                simpleAddress: inputValue.userSimpleAddress,
                detailAddress: inputValue.userDetailAddress,
              },
              deliveryInformation: {
                name: inputValue.username,
                phoneNumber: inputValue.userPhoneNumber,
                address: {
                  zipCode: inputValue.userZipCode,
                  simpleAddress: inputValue.userSimpleAddress,
                  detailAddress: inputValue.userDetailAddress,
                },
              },
            });
          } else if (save) {
            patchData('/users', {
              name: inputValue.username,
              phoneNumber: inputValue.userPhoneNumber,
              address: {
                zipCode: inputValue.userZipCode,
                simpleAddress: inputValue.userSimpleAddress,
                detailAddress: inputValue.userDetailAddress,
              },
              deliveryInformation: {
                name: inputValue.addressee,
                phoneNumber: inputValue.addresseePhoneNumber,
                address: {
                  zipCode: inputValue.deliveryZipCode,
                  simpleAddress: inputValue.deliverySimpleAddress,
                  detailAddress: inputValue.deliveryDetailAddress,
                },
              },
            });
          }
          dispatch(deleteCartItem(checkedCartMealBoxId));
          navigate('/myinfo/orderhistory');
        } else if (data.status === 409) {
          alert('관리자에게 문의하세요.');
          patchData(`/payments/error/${inputValue.orderNumber}`, '');
        } else {
          alert('관리자에게 문의하세요.');
        }
      });
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  useEffect(() => {
    if (inputValue.addresseePhoneNumber.length === 11) {
      setInputValue({
        ...inputValue,
        ['addresseePhoneNumber']: inputValue.addresseePhoneNumber.replace(
          /(\d{3})(\d{4})(\d{4})/,
          '$1-$2-$3'
        ),
      });
    }
  }, [inputValue.addresseePhoneNumber]);

  return (
    <GetTemplate isPending={isPending} error={error} res={res} title="결제하기">
      <ContainerDiv className="margininside">
        <PaymentUl
          inputValue={inputValue}
          setInputValue={setInputValue}
          same={same}
          setSame={setSame}
          save={save}
          setSave={setSave}
        />
        <CartAside
          totalPrice={inputValue.totalPrice}
          buttonClick={handleClick}
          pathName="payment"
        />
      </ContainerDiv>
    </GetTemplate>
  );
}

export default Payment;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: space-between;
`;
