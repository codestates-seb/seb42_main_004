import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';
import surveyQuestionReducer from '../reducers/surveyQuestionReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import cartReducer from '../reducers/cartReducer';
import userReducer from '../reducers/userReducer';

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

export const rootReducer = combineReducers({
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
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
