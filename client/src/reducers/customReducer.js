import { createSlice } from '@reduxjs/toolkit';

const customSlice = createSlice({
  name: 'custom',
  initialState: {
    custom: {
      products: [],
      quantity: 1,
      totalWeight: 0,
      totalKcal: 0,
      totalPrice: 0,
    },
  },
  reducers: {
    addProduct: (state, action) => {
      let { custom } = state;
      const total = custom.products.reduce((a, c) => a + c.quantity, 0);
      if (total < 10) {
        const product = action.payload;
        custom.products.push(product);
        custom.totalWeight += product.weight;
        custom.totalKcal += product.kcal;
        custom.totalPrice += product.price;
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      let { custom } = state;
      const idx = custom.products.map((product) => product.id).indexOf(id);
      const product = custom.products.splice(idx, 1);
      custom.totalWeight -= product.weight * product.quantity;
      custom.totalKcal -= product.kcal * product.quantity;
      custom.totalPrice -= product.price * product.quantity;
    },
    setProduct: (state, action) => {
      const { id, num } = action.payload;
      if (num === 0) return;
      let { custom } = state;
      const total = custom.products.reduce((a, c) => a + c.quantity, 0);
      const idx = custom.products.map((product) => product.id).indexOf(id);
      if (total < 10) {
        const product = custom.products[idx];
        product.quantity = num;
        custom.totalWeight -= product.weight;
        custom.totalKcal -= product.kcal;
        custom.totalPrice -= product.price;
      }
    },
    setCustom: (state, action) => {
      state.custom.quantity = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, setProduct, setCustom } =
  customSlice.actions;
export default customSlice.reducer;
