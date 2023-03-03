//추후 삭제 예정
import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: { example: '' },
  reducers: {
    setExample: (state, action) => {
      state.example = action.payload;
    },
  },
});

export const { setExample } = exampleSlice.actions;
export default exampleSlice.reducer;
