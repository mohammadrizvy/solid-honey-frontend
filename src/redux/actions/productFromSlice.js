import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../../axios";


export const getCategories = createAsyncThunk("productForm/getCategories", async () => {
    const response = await instance.get('/process/control/product/process/first/receive/with/label')
    return response
})


export const getProductProcessList = createAsyncThunk("productForm/getProductProcessList", async () => {
  const response = await instance.get('/process/control/product/process/process-products-list/')
  return response
})


const initialState = {
    loading: false,
    error: null,
    categories: [],
    customer_with_process_products: []
}

const productFormSlice = createSlice({
    name: 'productForm',
    initialState,


    extraReducers: (builder) => {
        builder
          .addCase(getCategories.pending, (state, action) => {
            state.loading = true
          })
          .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload?.data?.pscs;
            state.loading = false
          })
          .addCase(getCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
          })


          // process product
          .addCase(getProductProcessList.pending, (state, action) => {
            state.loading = true
          })
          .addCase(getProductProcessList.fulfilled, (state, action) => {
            state.customer_with_process_products = action.payload?.data?.process_products;
            state.loading = false
          })
          .addCase(getProductProcessList.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
          })

    }
})

export default productFormSlice.reducer;