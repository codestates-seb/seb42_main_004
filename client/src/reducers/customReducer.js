import { createSlice } from '@reduxjs/toolkit';

const customSlice = createSlice({
  name: 'custom',
  initialState: {
    custom: {
      products: [],
      weight: 0,
      kcal: 0,
      price: 0,
      name: 'custom',
    },
  },
  reducers: {
    addProduct: (state, action) => {
      let { custom } = state;
      const total = custom.products.reduce((a, c) => a + c.quantity, 0);
      if (total < 10) {
        const product = action.payload;
        custom.products.push({
          productId: product.productId,
          name: product.name,
          quantity: product.quantity,
        });
        custom.weight += product.weight * product.quantity;
        custom.kcal += product.kcal * product.quantity;
        custom.price += product.price * product.quantity;
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload;
      let { custom } = state;
      const idx = custom.products.map((product) => product.id).indexOf(id);
      const product = custom.products.splice(idx, 1);
      custom.weight -= product.weight * product.quantity;
      custom.kcal -= product.kcal * product.quantity;
      custom.price -= product.price * product.quantity;
    },
    setProduct: (state, action) => {
      const { id, num } = action.payload;
      if (num === 0) return;
      let { custom } = state;
      const total = custom.products.reduce((a, c) => a + c.quantity, 0);
      const idx = custom.products.map((product) => product.id).indexOf(id);
      if (total < 10) {
        const product = custom.products[idx];
        if (product.quantity > num) {
          custom.weight -= product.weight;
          custom.kcal -= product.kcal;
          custom.price -= product.price;
        } else {
          custom.weight += product.weight;
          custom.kcal += product.kcal;
          custom.price += product.price;
        }
        product.quantity = num;
      }
    },
    setName: (state, action) => {
      state.custom.name = action.payload;
    },
    setId: (state, action) => {
      state.custom.id = action.payload;
    },
    initializeCustom: (state) => {
      state.custom = {
        products: [],
        weight: 0,
        kcal: 0,
        price: 0,
        name: 'custom',
      };
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  setProduct,
  setName,
  setId,
  initializeCustom,
} = customSlice.actions;
export default customSlice.reducer;
