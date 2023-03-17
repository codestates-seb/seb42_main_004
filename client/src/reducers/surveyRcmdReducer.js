import { createSlice } from '@reduxjs/toolkit';

const surveyRcmdSlice = createSlice({
  name: 'surveyRcmd',
  initialState: { surveyRcmd: { morning: {}, lunch: {}, dinner: {} } },
  reducers: {
    setSurveyRcmd: (state, action) => {
      state.surveyRcmd = { ...action.payload };
    },
    deleteSurveyRcmd: (state) => {
      const { surveyRcmd } = state;
      surveyRcmd.morning = {};
      surveyRcmd.lunch = {};
      surveyRcmd.dinner = {};
    },
  },
});

export const { setSurveyRcmd, deleteSurveyRcmd } = surveyRcmdSlice.actions;
export default surveyRcmdSlice.reducer;
