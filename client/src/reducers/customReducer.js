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
    totalProducts: (custom) => {
      return custom.products.reduce((a, c) => a + c.quantity, 0);
    },
    updateInfo: (custom, product, plus, all) => {
      const quantity = all ? product.quantity : 1;
      if (plus) {
        custom.weight += product.weight * quantity;
        custom.kcal += product.kcal * quantity;
        custom.price += product.price * quantity;
      } else {
        custom.weight -= product.weight * quantity;
        custom.kcal -= product.kcal * quantity;
        custom.price -= product.price * quantity;
      }
    },
    addProduct: (state, action) => {
      const { custom } = state;
      const total = customSlice.caseReducers.totalProducts(custom);
      if (total < 10) {
        const { product } = action.payload;
        const { productId, name, quantity } = product;
        custom.products.push({ productId, name, quantity });
        customSlice.caseReducers.updateInfo(custom, product, true, true);
      }
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload;
      const { custom } = state;
      const idx = custom.products.map((product) => product.id).indexOf(id);
      const product = custom.products.splice(idx, 1);
      customSlice.caseReducers.updateInfo(custom, product, false, true);
    },
    setProduct: (state, action) => {
      const { quantity } = action.payload.product;
      const { custom } = state;
      const { product } = action.payload;
      if (quantity > 0) {
        const idx = custom.products
          .map((product) => product.productId)
          .indexOf(product.productId);
        let beforeQuantity = idx === -1 ? 0 : custom.products[idx].quantity;
        if (idx === -1) {
          const { productId, name } = product;
          custom.products.push({ productId, name, quantity });
        } else {
          custom.products[idx].quantity = quantity;
        }
        customSlice.caseReducers.updateInfo(
          custom,
          product,
          beforeQuantity < quantity
        );
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
