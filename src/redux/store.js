import { configureStore } from "@reduxjs/toolkit";
import productFormSlice from "./actions/productFromSlice"
import categorySlice from "./actions/categoriesSlice"
import workersSlice from "./actions/workersSlice"
import customerSlice from "./actions/customerSlice"
import supplierSlice from "./actions/supplierSlice"
import rolesSlice from "./actions/rolesSlice";

export const store = configureStore({
    reducer: {
        productsForm: productFormSlice,
        category: categorySlice,
        workers : workersSlice,
        customers : customerSlice,
        suppliers : supplierSlice,
        roles:     rolesSlice   
    }
})