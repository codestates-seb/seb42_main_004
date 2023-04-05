import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Error from './pages/Error';
import Custom from './pages/Custom';
import Survey from './pages/Survey';
import Signup from './pages/Signup';
import MyInfo from './pages/MyInfo';
import Payment from './pages/Payment';
import AllBoxes from './pages/AllBoxes';
import Products from './pages/Products';
import SendEmail from './pages/SendEmail';
import EditMyInfo from './pages/EditMyInfo';
import SurveyHome from './pages/SurveyHome';
import SignupOauth from './pages/SignupOauth';
import ConfirmEmail from './pages/ConfirmEmail';
import EditPassword from './pages/EditPassword';
import FindPassword from './pages/FindPassword';
import GlobalStyle from './global/globalstyles';
import OrderHistory from './pages/OrderHistory';
import RequestEmail from './pages/RequestEmail';
import SurveyResult from './pages/SurveyResult';
import Footer from './components/commons/Footer';
import Header from './components/commons/Header';
import CompleteEmail from './pages/CompleteEmail';
import SignupComplete from './pages/SignupComplete';
import ToTopButton from './components/commons/ToTopButton';
import { setProfile } from './reducers/userReducer';
import { setAuth, setEmail } from './reducers/authReducer';
import getData from './util/getData';
import parseToken from './util/parseToken';
import checkFooter from './util/checkFooter';
import useInitialize from './util/useInitialize';
import setAuthorizationToken from './util/setAuthorizationToken';

function App() {
  const { admin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const initialize = useInitialize();
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
        dispatch(setProfile({ imagePath: data.imagePath, name: data.name }));
      });
      const remainingTime = Math.floor(
        (new Date(exp * 1000).getTime() - new Date().getTime()) / (60 * 1000)
      );
      logoutTimer = setTimeout(() => {
        initialize().then(() => {
          alert('자동 로그아웃되었습니다.');
        });
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
  padding-bottom: 4rem;
  min-height: calc(100vh - 280px);

  @media screen and (max-width: 768px) {
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '230px')});
    padding-bottom: calc(${(props) => (props.height ? '90px' : '0px')} + 4rem);
  }

  @media screen and (max-width: 480px) {
    min-height: calc(100vh - ${(props) => (props.height ? '0px' : '180px')});
    padding-bottom: ${(props) =>
      props.pathname === '/'
        ? '0'
        : `calc(${(props) => (props.height ? '76px' : '0px')} + 4rem)`};
  }
`;
