import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../../axios";


export const getCategoriesList = createAsyncThunk("category/getCategoriesList", async () => {
    const response = await instance.get('/admin_control/categories/')
    return response
})



const initialState = {
    loading: false,
    error: null,
    categories: [],

}

const categorySlice = createSlice({
    name: 'category',
    initialState,


    extraReducers: (builder) => {
        builder
          .addCase(getCategoriesList.pending, (state, action) => {
            state.loading = true
          })
          .addCase(getCategoriesList.fulfilled, (state, action) => {
            state.categories = action.payload?.data;
            state.loading = false
          })
          .addCase(getCategoriesList.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message;
          })


    }
})

export default categorySlice.reducer;