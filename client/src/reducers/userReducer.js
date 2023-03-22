import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    name: null,
    phoneNumber: null,
    address: null,
    status: null,
    imagePath: null,
    deliveryInformation: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.address = action.payload.address;
      state.status = action.payload.status;
      state.imagePath = action.payload.imagePath;
      state.deliveryInformation = action.payload.deliveryInformation;
    },
  },
});

export const { setUser, DeleteUser } = userSlice.actions;
export default userSlice.reducer;
