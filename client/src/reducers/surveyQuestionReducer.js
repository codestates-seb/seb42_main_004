import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  age: '',
  gender: 'MALE',
  height: '',
  weight: '',
  active: 'NOT_ACTIVE',
  plan: 'easy',
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

    setPlan: (state, action) => {
      state.plan = action.payload;
    },

    setReset: () => initialState,
  },
});

export const { setProfile, setGender, setActive, setPlan, setReset } =
  surveyQuestionSlice.actions;
export default surveyQuestionSlice.reducer;
