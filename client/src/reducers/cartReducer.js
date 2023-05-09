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
      const newItem = action.payload;
      const existingIdx =
        newItem.name !== 'custom'
          ? findIdx(cart.mealboxes, 'mealboxId', newItem.mealboxId)
          : -1;

      if (existingIdx === -1) {
        newItem.cartMealboxId = newItem.cartMealboxId || new Date().getTime();
        cart.mealboxes.push(newItem);
      } else {
        cart.mealboxes[existingIdx].quantity++;
      }

      cart.totalPrice += newItem.price * newItem.quantity;
    },

    deleteCartItem: (state, action) => {
      const { cart } = state;
      const deleteIds = action.payload;
      let totalPriceChange = 0;
      cart.mealboxes = cart.mealboxes.filter((mealbox) => {
        if (deleteIds.includes(mealbox.cartMealboxId)) {
          totalPriceChange -= mealbox.price * mealbox.quantity;
          return false;
        }
        return true;
      });
      cart.totalPrice += totalPriceChange;
    },

    setQuantity: (state, action) => {
      const { cart } = state;
      const { id, amount } = action.payload;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', id);
      const item = cart.mealboxes[idx];
      item.quantity += amount;
      cart.totalPrice += item.price * amount;
    },

    initializeCart: () => initialState,
  },
});

export const {
  setCart,
  addCartItem,
  deleteCartItem,
  setQuantity,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
