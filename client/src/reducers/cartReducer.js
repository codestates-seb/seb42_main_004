import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {} };
//{totalPrice: 25000, mealboxes:{}, {}... }}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
