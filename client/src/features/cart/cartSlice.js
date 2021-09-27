import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartList: [],
  total: 0,
  amount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
      state.total += 1;
      state.amount += action.payload.cost;
    },
    removeFromCart: (state, action) => {
      // state.cartList = state.cartList.filter(
      //   (item) => item.id !== action.payload.id,
      // );
      state.amount -= state.cartList[0]?.cost;
      state.cartList = state.cartList.slice(1);
      state.total -= 1;
    },
    deleteFromCart: (state) => {
      state.cartList = [];
      state.total = 0;
      state.amount = 0;
    },
    IncrementTotal: (state, action) => {
      state.total += action.payload.value;
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, IncrementTotal } =
  cartSlice.actions;

export const selectCartList = (state) => state.cartList;

export default cartSlice.reducer;
