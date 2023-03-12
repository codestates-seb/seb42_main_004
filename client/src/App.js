import { Route, Routes } from 'react-router-dom';
import Header from './components/commons/Header';
import GlobalStyle from './global/globalstyles';
import Footer from './components/commons/Footer';
import AllBoxes from './pages/AllBoxes';
// import RecommendedBox from './pages/RecommendedBox';
// import Custom from './pages/Custom';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Explain from './pages/Explain';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="marginbase bodymargin">
        <Routes>
          <Route path="/" element={<AllBoxes />} />
          {/* <Route path="/survey/recommend" element={<RecommendedBox />} />
          <Route path="/custom" element={<Custom />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explain" element={<Explain />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
