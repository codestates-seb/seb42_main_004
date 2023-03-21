import { combineReducers, configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';
import surveyQuestionReducer from '../reducers/surveyQuestionReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import orderHistoryReducer from '../reducers/orderHistoryReducer';
import cartReducer from '../reducers/cartReducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['surveyQuestionReducer'],
};

export const rootReducer = combineReducers({
  exampleReducer,
  customReducer,
  surveyRcmdReducer,
  surveyQuestionReducer,
  orderHistoryReducer,
  cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
