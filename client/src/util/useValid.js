import { useEffect, useState } from 'react';

function useValid(InputValue) {
  const [validText, setValidText] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  useEffect(() => {
    if (InputValue.name.length >= 2 && InputValue.name.length <= 10) {
      setValidText({ ...validText, name: '' });
      setIsValid({ ...isValid, name: true });
    } else if (InputValue.name.length < 2) {
      setValidText({ ...validText, name: '2자 이상 입력해주세요.' });
      setIsValid({ ...isValid, name: false });
    } else {
      setValidText({ ...validText, name: '10자 이하로 입력해주세요.' });
      setIsValid({ ...isValid, name: false });
    }
  }, [InputValue.name]);

  useEffect(() => {
    //eslint-disable-next-line
    const exp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exp.test(InputValue.email)) {
      setValidText({ ...validText, email: '' });
      setIsValid({ ...isValid, email: true });
    } else {
      setValidText({ ...validText, email: '이메일 형식이 올바르지 않습니다.' });
      setIsValid({ ...isValid, email: false });
    }
  }, [InputValue.email]);

  useEffect(() => {
    //eslint-disable-next-line
    const exp = /^[a-zA-Z0-9]{8,}$/;
    if (
      exp.test(InputValue.password) &&
      !(InputValue.password.search(/[0-9]/g) < 0) &&
      !(InputValue.password.search(/[a-z]/gi) < 0)
    ) {
      setValidText({ ...validText, password: '' });
      setIsValid({ ...isValid, password: true });
    } else {
      setValidText({
        ...validText,
        password: '영문, 숫자를 포함하여 8자 이상 입력해주세요.',
      });
      setIsValid({ ...isValid, password: false });
    }
  }, [InputValue.password, InputValue.passwordConfirm]);

  useEffect(() => {
    if (!InputValue.passwordConfirm) {
      setIsValid({ ...isValid, passwordConfirm: false });
    } else if (InputValue.password === InputValue.passwordConfirm) {
      setValidText({ ...validText, passwordConfirm: '' });
      setIsValid({ ...isValid, passwordConfirm: true });
    } else {
      setValidText({
        ...validText,
        passwordConfirm: '비밀번호가 일치하지않습니다.',
      });
      setIsValid({ ...isValid, passwordConfirm: false });
    }
  }, [InputValue.password, InputValue.passwordConfirm]);

  useEffect(() => {
    setValidText({
      ...validText,
    });
  }, []);

  return [validText, isValid, setValidText];
}

export default useValid;
