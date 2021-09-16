import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartList: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
      state.total += 1;
    },
    removeFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload.id,
      );
      state.total -= 1;
    },
    IncrementTotal: (state, action) => {
      state.total += action.payload.value;
    },
  },
});

export const { addToCart, removeFromCart, IncrementTotal } = cartSlice.actions;

export const selectCartList = (state) => state.cartList;

export default cartSlice.reducer;
