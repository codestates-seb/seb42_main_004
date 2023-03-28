import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { imagePath: null, name: '' },
  reducers: {
    setProfile: (state, action) => {
      state.imagePath = action.payload.imagePath;
      state.name = action.payload.name;
    },
    setImage: (state, action) => {
      state.imagePath = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setProfile, setImage, setName } = userSlice.actions;
export default userSlice.reducer;
