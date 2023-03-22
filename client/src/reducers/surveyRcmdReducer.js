import { createSlice } from '@reduxjs/toolkit';

const surveyRcmdSlice = createSlice({
  name: 'surveyRcmd',
  initialState: { surveyRcmd: { breakfast: null, lunch: null, dinner: null } },
  reducers: {
    setSurveyRcmd: (state, action) => {
      state.surveyRcmd = { ...action.payload };
    },
    deleteSurveyRcmd: (state) => {
      const { surveyRcmd } = state;
      surveyRcmd.breakfast = null;
      surveyRcmd.lunch = null;
      surveyRcmd.dinner = null;
    },
  },
});

export const { setSurveyRcmd, deleteSurveyRcmd } = surveyRcmdSlice.actions;
export default surveyRcmdSlice.reducer;
