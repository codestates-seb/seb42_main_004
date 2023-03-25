import { store } from '../../global/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';

export const persistor = persistStore(store);

function AppProvider({ children }) {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>{children}</BrowserRouter>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
}

export default AppProvider;
