import { createSlice } from '@reduxjs/toolkit';

const surveyQuestionSlice = createSlice({
  name: 'surveyQuesiton',
  initialState: { age: '', gender: '', height: '', weight: '', active: '' },
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
  },
});

export const { setAge, setGender, setHeight, setWeight, setActive } =
  surveyQuestionSlice.actions;
export default surveyQuestionSlice.reducer;
