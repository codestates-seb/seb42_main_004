import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: { imagePath: null },
  reducers: {
    setImage: (state, action) => {
      state.imagePath = action.payload;
    },
  },
});

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;
