import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';

const store = configureStore({
  reducer: {
    exampleReducer,
    customReducer,
    surveyRcmdReducer,
  },
});

export default store;
