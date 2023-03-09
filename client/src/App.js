// import { Route, Routes } from 'react-router-dom';
import Header from './components/commons/Header';
import GlobalStyle from './global/globalstyles';
import Footer from './components/commons/Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div className="marginbase ">
        {/* <Routes>
        <Route path="" element={ } />
      </Routes> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
