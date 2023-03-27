import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setEmail } from './reducers/authReducer';
import Header from './components/commons/Header';
import GlobalStyle from './global/globalstyles';
import Footer from './components/commons/Footer';
import AllBoxes from './pages/AllBoxes';
import SurveyResult from './pages/SurveyResult';
import Custom from './pages/Custom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Error from './pages/Error';
import OrderHistory from './pages/OrderHistory';
import Survey from './pages/Survey';
import Signup from './pages/Signup';
import SignupOauth from './pages/SignupOauth';
import MyInfo from './pages/MyInfo';
import Payment from './pages/Payment';
import Products from './pages/Products';
import EditMyInfo from './pages/EditMyInfo';
import EditPassword from './pages/EditPassword';
import CompleteEmail from './pages/CompleteEmail';
import ConfirmEmail from './pages/ConfirmEmail';
import SendEmail from './pages/SendEmail';
import FindPassword from './pages/FindPassword';
import SurveyHome from './pages/SurveyHome';
import SignupComplete from './pages/SignupComplete';
import RequestEmail from './pages/RequestEmail';
import ToTopButton from './components/commons/ToTopButton';
import { initializeCart } from './reducers/cartReducer';
import setAuthorizationToken from './util/setAuthorizationToken';
import parseToken from './util/parseToken';
import checkFooter from './util/checkFooter';
import { setImage } from './reducers/imageReducer';
import getData from './util/getData';

function App() {
  const { admin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const { pathname, search } = useLocation();

  if (accessToken) {
    setAuthorizationToken(accessToken);
  }

  useEffect(() => {
    let logoutTimer;
    if (accessToken) {
      const { exp, principal, roles } = parseToken(accessToken);
      dispatch(
        setAuth({
          isLogin: true,
          accessToken: accessToken,
          user: principal,
          admin: roles.includes('ADMIN'),
        })
      );
      dispatch(setEmail(''));
      getData('/users').then((data) => {
        dispatch(setImage(data.imagePath));
      });
      const remainingTime = Math.floor(
        (new Date(exp * 1000).getTime() - new Date().getTime()) / (60 * 1000)
      );
      logoutTimer = setTimeout(() => {
        localStorage.removeItem('accessToken');
        dispatch(
          setAuth({
            isLogin: false,
            accessToken: '',
            user: {},
            roles: [],
          })
        );
        dispatch(setEmail(''));
        dispatch(initializeCart());
        dispatch(setImage(null));
        alert('자동 로그아웃되었습니다.');
        window.location.reload();
      }, remainingTime * 60 * 1000);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [accessToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <>
      <GlobalStyle admin={admin && 1} />
      <Header />
      <BodyMargin
        className="marginbase"
        height={checkFooter() ? 1 : null}
        pathname={pathname}
      >
        <Routes>
          <Route path="/" element={<SurveyHome />} />
          <Route path="/mealboxes/*" element={<AllBoxes />} />
          <Route
            path="/survey/question/:page"
            element={admin ? <AllBoxes /> : <Survey />}
          />
          <Route path="/survey/result" element={<SurveyResult />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/myinfo/orderhistory"
            element={accessToken ? <OrderHistory /> : <Login />}
          />
          <Route path="/products/*" element={<Products />} />
          <Route
            path="/login"
            element={accessToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={accessToken ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/signup/oauth"
            element={accessToken ? <Navigate to="/" /> : <SignupOauth />}
          />
          <Route
            path="/signup/complete"
            element={accessToken ? <Navigate to="/" /> : <SignupComplete />}
          />
          <Route
            path="/myinfo"
            element={accessToken ? <MyInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/myinfo/edit"
            element={accessToken ? <EditMyInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/myinfo/edit/password"
            element={accessToken ? <EditPassword /> : <Navigate to="/login" />}
          />
          <Route path="/email/complete" element={<CompleteEmail />} />
          <Route path="/email/confirm" element={<ConfirmEmail />} />
          <Route
            path="/email/request"
            element={accessToken ? <RequestEmail /> : <Navigate to="/login" />}
          />
          <Route path="/email/send" element={<SendEmail />} />
          <Route
            path="/email/send/signup"
            element={<SendEmail pathName="signup" />}
          />
          <Route path="/email/send/password" element={<FindPassword />} />
          <Route
            path="/cart/payment/:orderId"
            element={accessToken ? <Payment /> : <Navigate to="/login" />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
        <ToTopButton />
      </BodyMargin>
      <Footer />
    </>
  );
}

export default App;

const BodyMargin = styled.div`
  padding-top: ${(props) =>
    props.pathname === '/' ? '0' : 'calc(1rem + 50px)'}; 
  padding-bottom:  4rem;
  min-height: calc(100vh - 280px);

  @media screen and (max-width: 768px) {
    /* min-height: calc(100vh - 230px); */
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '230px')});
    padding-bottom: calc(${(props) => (props.height ? '90px' : '0px')} + 4rem);
  }

  @media screen and (max-width: 480px) {
    min-height:  calc(100vh - ${(props) => (props.height ? '0px' : '180px')});
    padding-bottom: ${(props) =>
      props.pathname === '/'
        ? '0'
        : `calc(${(props) => (props.height ? '76px' : '0px')} + 4rem)`};
  
`;
