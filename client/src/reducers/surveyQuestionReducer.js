import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  age: '',
  gender: '남성',
  height: '',
  weight: '',
  active: '비활동적',
  dietPlan: 'Easy',
};

const surveyQuestionSlice = createSlice({
  name: 'surveyQuesiton',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state[action.payload.id] = action.payload.value;
    },

    setGender: (state, action) => {
      state.gender = action.payload;
    },

    setActive: (state, action) => {
      state.active = action.payload;
    },

    setDietPlan: (state, action) => {
      state.dietPlan = action.payload;
    },

    setReset: () => initialState,
  },
});

export const { setProfile, setGender, setActive, setDietPlan, setReset } =
  surveyQuestionSlice.actions;
export default surveyQuestionSlice.reducer;
