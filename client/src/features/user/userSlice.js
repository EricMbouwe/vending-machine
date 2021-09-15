import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser, login, logout, register } from './userAPI';

const initialState = {
  data: {},
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
      })
      .addCase(fecthUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.data = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = {};
      });
  },
});

// export const { someActions } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
