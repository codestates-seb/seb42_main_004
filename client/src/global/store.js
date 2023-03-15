import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';
import cartReducer from '../reducers/cartReducer';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';

const store = configureStore({
  reducer: {
    exampleReducer,
    cartReducer,
    customReducer,
    surveyRcmdReducer,
  },
});

export default store;
