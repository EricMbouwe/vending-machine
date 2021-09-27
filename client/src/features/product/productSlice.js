import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchSellerProducts,
  deleteProduct,
  createProduct,
} from './productAPI';

const initialState = {
  products: [],
  sellerProducts: [],
  status: null,
};

export const fecthProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const products = await fetchProducts();
    return products;
  },
);

export const fecthProductsBySeller = createAsyncThunk(
  'product/fetchProductsBySeller',
  async (sellerId) => {
    const products = await fetchSellerProducts(sellerId);
    return products;
  },
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (body) => {
    const products = await createProduct(body);
    return products;
  },
);

export const deleteProductAsync = createAsyncThunk(
  'product/deleteProduct',
  async (productId) => {
    const products = await deleteProduct(productId);
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
      })
      .addCase(fecthProductsBySeller.fulfilled, (state, action) => {
        state.sellerProducts = action.payload;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.sellerProducts.push(action.payload);
        state.products.push(action.payload);
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.sellerProducts = state.sellerProducts.filter(
          (item) => item.id !== action.payload.id,
        );
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id,
        );
      });
  },
});

// export const { someActions } = userSlice.actions;

export const selectProductList = (state) => state.products;

export default productSlice.reducer;
