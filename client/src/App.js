import { Route, Routes } from 'react-router-dom';
import Header from './components/commons/Header';
import GlobalStyle from './global/globalstyles';
import Footer from './components/commons/Footer';
import AllBoxes from './pages/AllBoxes';
import RecommendedBox from './pages/RecommendedBox';
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

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="marginbase bodymargin">
        <Routes>
          <Route path="/" element={<AllBoxes />} />
          <Route path="/:page" element={<AllBoxes />} />
          <Route path="/survey/question/:page" element={<Survey />} />
          <Route path="/survey/result" element={<RecommendedBox />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myinfo/orderhistory" element={<OrderHistory />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/oauth" element={<SignupOauth />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/myinfo/edit" element={<EditMyInfo />} />
          <Route path="/myinfo/edit/password" element={<EditPassword />} />
          <Route path="/email/complete" element={<CompleteEmail />} />
          <Route path="/email/confirm" element={<ConfirmEmail />} />
          <Route path="/email/send" element={<SendEmail />} />
          <Route path="/email/send/password" element={<FindPassword />} />
          <Route path="/cart/payment" element={<Payment />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
