import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../axios";

// Async thunk to fetch a single supplier by ID
export const fetchSupplierById = createAsyncThunk(
    "suppliers/fetchSupplierById",
    async (supplierId, thunkAPI) => {
        try {
            const response = await instance.get(`/buyer/product/saler/user/all/${supplierId}`);
            console.log("Fetched supplier data:", response.data);
            return response.data; // Assuming response.data contains the single supplier object
        } catch (error) {
            throw Error(error.message);
        }
    }
);

// Async thunk to fetch all suppliers
export const getSuppliers = createAsyncThunk(
    "suppliers/getSuppliers",
    async () => {
        try {
            const response = await instance.get("/buyer/product/saler/user/all");
            console.log("Fetched suppliers data:", response.data);
            return response.data.psus; // Return the 'psus' array from the response
        } catch (error) {
            throw Error(error.message);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    suppliers: [],
    singleSupplier: null, // Add state for single supplier
};

const supplierSlice = createSlice({
    name: "suppliers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSuppliers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSuppliers.fulfilled, (state, action) => {
                state.suppliers = action.payload; // Use the payload directly
                state.loading = false;
            })
            .addCase(getSuppliers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSupplierById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSupplierById.fulfilled, (state, action) => {
                state.singleSupplier = action.payload; // Update singleSupplier state
                state.loading = false;
            })
            .addCase(fetchSupplierById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default supplierSlice.reducer;
