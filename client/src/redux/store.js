import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import productReducer from './features/Product/productSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
