import { useCookies } from 'react-cookie';

const isLogin = () => {
  const [cookies] = useCookies();
  return !!cookies.authorization;
};

export default isLogin;
