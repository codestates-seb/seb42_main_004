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
      const idx = cart.mealboxes.findIndex(
        (mealbox) =>
          mealbox.mealboxId && mealbox.mealboxId === newItem.mealboxId
      );

      if (idx !== -1) {
        cart.mealboxes[idx].quantity++;
      } else {
        newItem.cartMealboxId = newItem.cartMealboxId || new Date().getTime();
        cart.mealboxes.push(newItem);
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
      // const { cart } = state;
      // const deleteIds = action.payload;
      // deleteIds?.forEach((id) => {
      //   const idx = findIdx(cart.mealboxes, 'cartMealboxId', id);
      //   const deleteItem = cart.mealboxes[idx];
      //   cart.totalPrice -= deleteItem.price * deleteItem.quantity;
      //   cart.mealboxes.splice(idx, 1);
      // });
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
