import { Navigate, Route, Routes } from 'react-router-dom';
// import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setAuth } from './reducers/authReducer';
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
import Product from './pages/Product';
import EditMyInfo from './pages/EditMyInfo';
import EditPassword from './pages/EditPassword';
import CompleteEmail from './pages/CompleteEmail';
import ConfirmEmail from './pages/ConfirmEmail';
import SendEmail from './pages/SendEmail';
import FindPassword from './pages/FindPassword';
import SurveyHome from './pages/SurveyHome';
import ToTopButton from './components/commons/ToTopButton';
import setAuthorizationToken from './util/setAuthorizationToken';
import parseToken from './util/parseToken';
import { useEffect } from 'react';

function App() {
  // const [cookies, , removeCookie] = useCookies();
  // const { accessToken, tokenExpirationDate } = cookies;
  // let logoutTimer;

  // useEffect(() => {
  //   if (accessToken && tokenExpirationDate) {
  //     const remainingTime =
  //       tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(() => {
  //       removeCookie(accessToken);
  //       removeCookie(tokenExpirationDate);
  //     }, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [accessToken, tokenExpirationDate]);
  const dispatch = useDispatch();
  const [cookies, ,] = useCookies();
  const { accessToken } = cookies;

  if (cookies.accessToken) {
    setAuthorizationToken(accessToken);
  }

  useEffect(() => {
    if (cookies.accessToken) {
      const { exp, principal, roles } = parseToken(accessToken);
      dispatch(
        setAuth({
          isLogin: true,
          accessToken: accessToken,
          tokenExpirationDate: new Date(exp),
          user: principal,
          admin: roles.includes('ADMIN'),
        })
      );
    }
  }, [cookies.accessToken]);

  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="marginbase bodymargin">
        <Routes>
          <Route path="/" element={<SurveyHome />} />
          <Route path="/mealboxes" element={<AllBoxes />} />
          <Route path="/mealboxes/:page" element={<AllBoxes />} />
          <Route path="/survey/question/:page" element={<Survey />} />
          <Route path="/survey/result" element={<SurveyResult />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/myinfo/orderhistory"
            element={cookies.accessToken ? <OrderHistory /> : <Login />}
          />
          <Route path="/product" element={<Product />} />
          <Route
            path="/login"
            element={cookies.accessToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={cookies.accessToken ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/signup/oauth"
            element={
              cookies.accessToken ? <Navigate to="/" /> : <SignupOauth />
            }
          />
          <Route
            path="/myinfo"
            element={
              cookies.accessToken ? <MyInfo /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/myinfo/edit"
            element={
              cookies.accessToken ? <EditMyInfo /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/myinfo/edit/password"
            element={
              cookies.accessToken ? <EditPassword /> : <Navigate to="/login" />
            }
          />
          <Route path="/email/complete" element={<CompleteEmail />} />
          <Route path="/email/confirm" element={<ConfirmEmail />} />
          <Route path="/email/send" element={<SendEmail />} />
          <Route path="/email/send/password" element={<FindPassword />} />
          <Route
            path="/cart/payment"
            element={
              cookies.accessToken ? <Payment /> : <Navigate to="/login" />
            }
          />
          <Route path="/*" element={<Error />} />
        </Routes>
        <ToTopButton />
      </div>
      <Footer />
    </>
  );
}

export default App;
