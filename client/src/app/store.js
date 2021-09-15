import { configureStore } from '@reduxjs/toolkit';
import roleReducer from '../features/role/roleSlice';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    roles: roleReducer,
    user: userReducer,
    products: productReducer,
  },
});
