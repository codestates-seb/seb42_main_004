import { createSlice } from '@reduxjs/toolkit';

const surveyQuestionSlice = createSlice({
  name: 'surveyQuesiton',
  initialState: {
    age: '',
    gender: '남성',
    height: '',
    weight: '',
    active: '비활동적',
    dietPlan: 'Easy',
  },
  reducers: {
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setDietPlan: (state, action) => {
      state.dietPlan = action.payload;
    },
    setReset: (state, action) => {
      state.age = action.payload;
      state.gender = '남성';
      state.height = action.payload;
      state.weight = action.payload;
      state.active = '비활동적';
      state.dietPlan = 'Easy';
    },
  },
});

export const {
  setAge,
  setGender,
  setHeight,
  setWeight,
  setActive,
  setDietPlan,
  setReset,
} = surveyQuestionSlice.actions;
export default surveyQuestionSlice.reducer;
