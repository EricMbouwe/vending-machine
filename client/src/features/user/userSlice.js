import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  login,
  logout,
  register,
  buy,
  reset,
  deposit,
} from './userAPI';

const initialState = {
  data: {},
  deposit: 0,
  returnedMoney: {},
  totalSpent: 0,
  productsPurchasedList: [],
  status: null,
};

export const fecthUserAsync = createAsyncThunk('user/fetchUser', async () => {
  const userData = await fetchUser();
  return userData;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (credentials) => {
    const userData = await register(credentials);
    return userData;
  },
);

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const userData = await login(credentials);
  return userData;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logout();
});

export const makeDeposit = createAsyncThunk(
  'user/makeDeposit',
  async (body) => {
    const data = await deposit(body);
    return data;
  },
);

export const resetDeposit = createAsyncThunk(
  'user/resetDeposit',
  async (body) => {
    const data = await reset(body);
    return data;
  },
);

export const makePurchase = createAsyncThunk('user/buy', async (body) => {
  const data = await buy(body);
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fecthUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
        state.deposit = action.payload?.deposit;
      })
      .addCase(fecthUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.deposit = action.payload?.deposit;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.data = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.deposit = action.payload?.deposit;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = {};
      })
      .addCase(makeDeposit.fulfilled, (state, action) => {
        state.deposit = action.payload?.deposit;
      })
      .addCase(resetDeposit.fulfilled, (state, action) => {
        state.deposit = action.payload?.deposit;
        state.returnedMoney = action.payload?.returnedMoney;
      })
      .addCase(makePurchase.fulfilled, (state, action) => {
        state.returnedMoney = action.payload?.returnedMoney;
        state.totalSpent = action.payload?.totalSpent;
        state.productsPurchasedList = action.payload?.productsList;
        state.deposit = action.payload?.deposit;
      });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
