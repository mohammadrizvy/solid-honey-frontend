// src/redux/slices/roleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {instance} from "../../../axios";

const initialState = {
  roles: [],
  loading: false,
  error: null,
};

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
  try {
    const response = await instance.get('/admin_control/employee/groups');
    return response.data; // Assuming response.data contains the roles array
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
        console.log('Roles fetched:', action.payload.roles); // Log roles data
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rolesSlice.reducer;
