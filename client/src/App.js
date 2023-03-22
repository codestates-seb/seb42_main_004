import { Navigate, Route, Routes } from 'react-router-dom';
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
import isLogin from './util/isLogin';

function App() {
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
          <Route path="/myinfo/orderhistory" element={<OrderHistory />} />
          <Route path="/product" element={<Product />} />
          <Route
            path="/login"
            element={isLogin() ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLogin() ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/signup/oauth"
            element={isLogin() ? <Navigate to="/" /> : <SignupOauth />}
          />
          <Route
            path="/myinfo"
            element={isLogin() ? <MyInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/myinfo/edit"
            element={isLogin() ? <EditMyInfo /> : <Navigate to="/login" />}
          />
          <Route
            path="/myinfo/edit/password"
            element={isLogin() ? <EditPassword /> : <Navigate to="/login" />}
          />
          <Route path="/email/complete" element={<CompleteEmail />} />
          <Route path="/email/confirm" element={<ConfirmEmail />} />
          <Route path="/email/send" element={<SendEmail />} />
          <Route path="/email/send/password" element={<FindPassword />} />
          <Route path="/cart/payment" element={<Payment />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <ToTopButton />
      </div>
      <Footer />
    </>
  );
}

export default App;
