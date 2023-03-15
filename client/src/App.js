import { Route, Routes } from 'react-router-dom';
import Header from './components/commons/Header';
import GlobalStyle from './global/globalstyles';
import Footer from './components/commons/Footer';
import AllBoxes from './pages/AllBoxes';
import RecommendedBox from './pages/RecommendedBox';
import Custom from './pages/Custom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Explain from './pages/Explain';
import Error from './pages/Error';
import OrderHistory from './pages/OrderHistory';
import Survey from './pages/Survey';
import Signup from './pages/Signup';
import SignupOauth from './pages/SignupOauth';
import MyInfo from './pages/MyInfo';
import Payment from './pages/Payment';
import ModifyMyInfo from './pages/ModifyMyInfo';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="marginbase bodymargin">
        <Routes>
          <Route path="/" element={<AllBoxes />} />
          <Route path="/survey/recommend" element={<RecommendedBox />} />
          <Route path="/custom" element={<Custom />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupoauth" element={<SignupOauth />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/modifymyinfo" element={<ModifyMyInfo />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/survey/:page" element={<Survey />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
