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
    addProductInBox: (state, action) => {
      customSlice.caseReducers.initializeCustom(state);
      const { custom } = state;
      const products = action.payload;
      custom.products = [...products];
      products.forEach((product) => {
        customSlice.caseReducers.updateInfo(custom, product, true, true);
      });
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      const { custom } = state;
      const idx = custom.products
        .map((product) => product.productId)
        .indexOf(productId);
      const product = custom.products.splice(idx, 1)[0];
      customSlice.caseReducers.updateInfo(custom, product, false, true);
    },
    setProduct: (state, action) => {
      const { custom } = state;
      const product = action.payload;
      const { quantity } = product;
      if (quantity > 0) {
        const idx = custom.products
          .map((product) => product.productId)
          .indexOf(product.productId);

        let beforeQuantity;
        if (idx === -1) {
          beforeQuantity = 0;
          custom.products.push({ ...product });
        } else {
          beforeQuantity = custom.products[idx].quantity;
          custom.products[idx].quantity = quantity;
        }

        customSlice.caseReducers.updateInfo(
          custom,
          product,
          beforeQuantity < quantity
        );
      }
    },
    setIdName: (state, action) => {
      state.custom.name = action.payload.name;
      state.custom.mealboxId = action.payload.mealboxId;
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
  addProductInBox,
  deleteProduct,
  setProduct,
  setIdName,
  initializeCustom,
} = customSlice.actions;
export default customSlice.reducer;
