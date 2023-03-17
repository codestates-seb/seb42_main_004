import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';
import customReducer from '../reducers/customReducer';
import surveyRcmdReducer from '../reducers/surveyRcmdReducer';
import surveyQuestionReducer from '../reducers/surveyQuestionReducer';
const store = configureStore({
  reducer: {
    exampleReducer,
    customReducer,
    surveyRcmdReducer,
    surveyQuestionReducer,
  },
});

export default store;
