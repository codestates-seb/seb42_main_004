import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';
import cartReducer from '../reducers/cartReducer';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';
import surveyQuestionReducer from '../reducers/surveyQuestionReducer';
const store = configureStore({
  reducer: {
    exampleReducer,
    cartReducer,
    customReducer,
    surveyRcmdReducer,
    surveyQuestionReducer,
  },
});

export default store;
