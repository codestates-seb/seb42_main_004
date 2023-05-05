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
      const newMealbox = action.payload;

      const existingMealbox = cart.mealboxes.find(
        (mealbox) => mealbox.mealboxId === newMealbox.mealboxId
      );

      if (existingMealbox) {
        existingMealbox.quantity++;
      } else {
        cart.mealboxes.push(newMealbox);
      }

      cart.totalPrice += newMealbox.price;
    },

    deleteCartItem: (state, action) => {
      const { cart } = state;
      const deleteIds = action.payload;
      deleteIds?.forEach((id) => {
        const idx = findIdx(cart.mealboxes, 'cartMealboxId', id);
        const deleteItem = cart.mealboxes[idx];
        cart.totalPrice -= deleteItem.price * deleteItem.quantity;
        cart.mealboxes.splice(idx, 1);
      });
    },

    setMinus: (state, action) => {
      const { cart } = state;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', action.payload);
      const minusItem = cart.mealboxes[idx];
      minusItem.quantity--;
      cart.totalPrice -= minusItem.price;
    },

    setPlus: (state, action) => {
      const { cart } = state;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', action.payload);
      const plusItem = cart.mealboxes[idx];
      plusItem.quantity++;
      cart.totalPrice += plusItem.price;
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
