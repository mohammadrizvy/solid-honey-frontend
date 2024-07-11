// src/redux/slices/roleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
  try {
    const response = await axios.get('/admin_control/employee/groups'); 
    return response.data;
  } catch (error) {
    throw Error(error.message);
  }
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles; // Ensure payload structure matches
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
