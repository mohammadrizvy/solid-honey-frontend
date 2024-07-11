// customerSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../axios";

// Async thunk to fetch all customers
export const getCustomers = createAsyncThunk(
  "customers/getCustomers",
  async () => {
    try {
      const response = await instance.get("/saler/coustomer/user/list");
      return response.data; // Ensure you return the data from the response
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Async thunk to fetch a single customer by ID
export const fetchCustomerById = createAsyncThunk(
  "customers/fetchCustomerById",
  async (customerId, thunkAPI) => {
    try {
      const response = await instance.get(`/saler/coustomer/user/list/${customerId}`);
      return response.data; // Assuming response.data contains the single customer object
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Define your initial state separately
const initialState = {
  loading: false,
  error: null,
  customers: [], // Initialize customers array here
  singleCustomer: null, // Add state for single customer
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors on pending
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.customers = action.payload.customers; // Use 'customers' from payload
        state.loading = false;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture and store the error message
      })
      .addCase(fetchCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors on pending
        state.singleCustomer = null; // Reset single customer state
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.singleCustomer = action.payload; // Update singleCustomer state
        state.loading = false;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture and store the error message
        state.singleCustomer = null; // Reset single customer state on error
      });
  },
});

export default customersSlice.reducer;
