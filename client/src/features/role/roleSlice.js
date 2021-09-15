import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRoles } from './roleAPI';

const initialState = {
  data: [],
  status: null,
};

export const fecthRolesAsync = createAsyncThunk('roles/fetchRoles', async () => {
  const roles = await fetchRoles();
  return roles;
});

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fecthRolesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthRolesAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fecthRolesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { someActions } = roleSlice.actions;

export const selectRoles = (state) => state.role.data;

export default roleSlice.reducer;
