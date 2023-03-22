import { createSlice } from '@reduxjs/toolkit';

const initialState = { guestCart: { totalPrice: 0, mealboxes: [] } };
//{totalPrice: 25000, mealboxes:[{}, {}... {}]}
const guestCartSlice = createSlice({
  name: 'guestCart',
  initialState,
  reducers: {
    addGuestCart: (state, action) => {
      const { guestCart } = state;
      const mealBox = action.payload;
      guestCart.mealboxes.push(mealBox);
      guestCart.totalPrice += mealBox.price;
    },
    deleteGuestCart: (state, action) => {
      const { guestCart } = state;
      const id = action.payload;
      const idx = guestCart.mealboxes.map((mealBox) => mealBox.id).indexOf(id);
      const mealBox = guestCart.mealboxes.splice(idx, 1);
      guestCart.totalPrice -= mealBox.price * mealBox.quantity;
    },
    setGuestCart: (state, action) => {
      const { id, num } = action.payload;
      if (num > 0) {
        const { guestCart } = state;
        const idx = guestCart.mealboxes
          .map((mealBox) => mealBox.id)
          .indexOf(id);
        const mealBox = guestCart.mealboxes[idx];
        if (mealBox.quantity > num) {
          guestCart.totalPrice -= mealBox.price;
        } else {
          guestCart.totalPrice += mealBox.price;
        }
        mealBox.quantity = num;
      }
    },
    initializeGuestCart: (state) => {
      state.guestCart = { totalPrice: 0, mealboxes: [] };
    },
  },
});

export const {
  addGuestCart,
  deleteGuestCart,
  setGuestCart,
  initializeGuestCart,
} = guestCartSlice.actions;

export default guestCartSlice.reducer;
