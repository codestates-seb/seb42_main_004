import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cart: [] },
  reducers: {
    addCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteCart: (state, action) => {
      state.cart = state.cart.filter((box) => box.id !== action.payload.id);
    },
    setCart: (state, action) => {
      const { id, num } = action.payload;
      if (num === 0) return;
      let { cart } = state;
      const idx = cart.products.map((product) => product.id).indexOf(id);
      cart[idx].quantity = num;
    },
  },
});

export const { addCart, deleteCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
