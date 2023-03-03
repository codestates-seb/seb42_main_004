import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../reducers/exampleReducer';

const store = configureStore({
  reducer: {
    exampleReducer,
  },
});

export default store;
