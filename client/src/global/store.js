import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';
import surveyQuestionReducer from '../reducers/surveyQuestionReducer';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from '../reducers/authReducer';
import cartReducer from '../reducers/cartReducer';
import userReducer from '../reducers/userReducer';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: [
    'customReducer',
    'surveyRcmdReducer',
    'surveyQuestionReducer',
    'cartReducer',
    'userReducer',
  ],
};
const rootReducer = combineReducers({
  customReducer,
  surveyRcmdReducer,
  surveyQuestionReducer,
  authReducer,
  cartReducer,
  userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
