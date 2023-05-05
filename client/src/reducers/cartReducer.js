import { createSlice } from '@reduxjs/toolkit';

function findIdx(mealboxes, totalId, targetId) {
  return mealboxes.findIndex((el) => String(el[totalId]) === String(targetId));
}

const initialState = { cart: { totalPrice: 0, mealboxes: [] } };

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
      const mealboxIds = cart.mealboxes.map((el) => el.mealboxId);
      if (mealBox.name === 'custom') {
        const newItem = {
          ...mealBox,
          cartMealboxId: new Date().getTime(),
        };
        cart.mealboxes.push(newItem);
      } else if (mealboxIds.includes(mealBox.mealboxId)) {
        const idx = findIdx(cart.mealboxes, 'mealboxId', mealBox.mealboxId);
        cart.mealboxes[idx].quantity += 1;
      } else {
        const newItem = { ...mealBox, cartMealboxId: mealBox.mealboxId };
        cart.mealboxes.push(newItem);
      }
      cart.totalPrice += mealBox.price * mealBox.quantity;
    },

    deleteCartItem: (state, action) => {
      const { cart } = state;
      action.payload?.forEach((id) => {
        const idx = findIdx(cart.mealboxes, 'cartMealboxId', id);
        cart.totalPrice -=
          cart.mealboxes[idx].price * cart.mealboxes[idx].quantity;
        cart.mealboxes.splice(idx, 1);
      });
    },

    setMinus: (state, action) => {
      const { cart } = state;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', action.payload);
      cart.mealboxes[idx].quantity--;
      cart.totalPrice -= cart.mealboxes[idx].price;
    },

    setPlus: (state, action) => {
      const { cart } = state;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', action.payload);
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
