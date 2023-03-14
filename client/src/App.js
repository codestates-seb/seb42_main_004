import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/commons/Header';
import GlobalStyle from './global/globalstyles';
import Footer from './components/commons/Footer';
import AllBoxes from './pages/AllBoxes';
import RecommendedBox from './pages/RecommendedBox';
import Custom from './pages/Custom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Explain from './pages/Explain';
import OrderHistory from './pages/OrderHistory';
import Survey from './pages/Survey';

function App() {
  let { pathname } = useLocation();
  console.log(pathname);

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
          <Route path="/login" element={<Login />} />
          <Route path="/explain" element={<Explain />} />
          <Route path="/survey/:page" element={<Survey />} />
        </Routes>
      </div>
      {pathname !== '/cart' && pathname !== '/custom' ? <Footer /> : null}
    </>
  );
}

export default App;
