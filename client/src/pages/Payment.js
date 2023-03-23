import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CartAside from '../components/commons/CartAside';
import PaymentUl from '../components/payment/PaymentUl';
import patchData from '../util/patchData';
import postData from '../util/postData';

function Payment() {
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
    onClickPayment();
    patchData('/orders/delivery/10', {
      addressee: inputValue.addressee,
      zipCode: inputValue.deliveryZipCode,
      simpleAddress: inputValue.deliverySimpleAddress,
      detailAddress: inputValue.deliveryDetailAddress,
      phoneNumber: inputValue.addresseePhoneNumber,
    }).then((data) => console.log(data));
  };

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp88722047');
    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: inputValue.orderNumber,
      name: '밀박스',
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
      }).then((data) => console.log(data));
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <ContainerDiv className="margininside">
      <PaymentUl inputValue={inputValue} setInputValue={setInputValue} />
      <CartAside totalPrice={inputValue.totalPrice} buttonClick={handleClick} />
    </ContainerDiv>
  );
}

export default Payment;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: space-between;
`;
