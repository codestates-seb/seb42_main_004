import { combineReducers, configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';
import surveyQuestionReducer from '../reducers/surveyQuestionReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import guestCartReducer from '../reducers/guestCartReducer';
import userReducer from '../reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: [
    'customReducer',
    'surveyRcmdReducer',
    'surveyQuestionReducer',
    'guestCartReducer',
  ],
};

export const rootReducer = combineReducers({
  exampleReducer,
  customReducer,
  surveyRcmdReducer,
  surveyQuestionReducer,
  guestCartReducer,
  userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
