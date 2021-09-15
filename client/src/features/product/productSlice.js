import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productAPI';

const initialState = {
  products: [],
  status: null,
};

export const fecthProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fecthProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthProductsAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.products = action.payload;
      })
      .addCase(fecthProductsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { someActions } = userSlice.actions;

export const selectProductList = (state) => state.products;

export default productSlice.reducer;
