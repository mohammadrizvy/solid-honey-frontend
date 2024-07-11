import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../../axios";

// Async thunk for fetching all workers
export const getWorkers = createAsyncThunk(
  "workers/getWorkers",
  async () => {
    try {
      const response = await instance.get('/admin_control/employee/all');
      return response.data.employees; // Access the employees data correctly
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Async thunk to fetch a single worker by ID
export const fetchWorkerById = createAsyncThunk(
  "workers/fetchWorkerById",
  async (workerId, thunkAPI) => {
    try {
      const response = await instance.get(`/admin_control/employee/all/${workerId}`);
      return response.data; // Assuming response.data contains the single worker object
    } catch (error) {
      throw Error(error.message);
    }
  }
);

// Initial state for workers slice
const initialState = {
  loading: false,
  error: null,
  workers: [],
  singleWorker: null, // State for single worker details
};

// Workers slice
const workersSlice = createSlice({
  name: 'workers',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWorkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkers.fulfilled, (state, action) => {
        state.workers = action.payload;
        state.loading = false;
      })
      .addCase(getWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchWorkerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkerById.fulfilled, (state, action) => {
        state.singleWorker = action.payload; // Update singleWorker state
        state.loading = false;
      })
      .addCase(fetchWorkerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workersSlice.reducer;
