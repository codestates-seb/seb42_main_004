import { createSlice } from '@reduxjs/toolkit';

const initialState = { cart: { totalPrice: 0, mealboxes: [] } };
//{totalPrice: 25000, mealboxes:[{}, {}... {}]}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    addCartItem: (state, action) => {
      const { cart } = state;
      const mealBox = action.payload;
      cart.mealboxes.push(mealBox);
      cart.totalPrice += mealBox.price;
    },

    deleteCartItem: (state, action) => {
      const { cart } = state;
      const idx = cart.mealboxes.findIndex(
        (el) => el.cartMealboxId === action.payload
      );
      cart.totalPrice -=
        cart.mealboxes[idx].price * cart.mealboxes[idx].quantity;
      cart.mealboxes.splice(idx, 1);
    },

    setMinus: (state, action) => {
      const { cart } = state;
      const idx = cart.mealboxes.findIndex(
        (el) => el.cartMealboxId === action.payload
      );

      cart.mealboxes[idx].quantity--;
      cart.totalPrice -= cart.mealboxes[idx].price;
    },

    setPlus: (state, action) => {
      const { cart } = state;
      const idx = cart.mealboxes.findIndex(
        (el) => el.cartMealboxId === action.payload
      );

      cart.mealboxes[idx].quantity++;
      cart.totalPrice += cart.mealboxes[idx].price;
    },

    initializeCart: () => initialState,
  },
});

export const {
  setCart,
  addCartItem,
  deleteCartItem,
  setMinus,
  setPlus,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
