import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  message: "",
};

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productService.addProduct(productData);
      return response.data; // Assuming your response includes data with products and a message
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const allProduct = createAsyncThunk(
  "product/allProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.allProduct();
      return response.data; // Assuming your response includes data with products and a message
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload; // Assuming the payload includes products
        state.message = action.payload;
        console.log(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.message = action.payload || "Failed to add product.";
      })
      .addCase(allProduct.fulfilled, (state, action) => {
        // Assuming you want to update state.products with the data from allProduct
        state.products = action.payload;
        console.log(action.payload)
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.message = action.payload || "Failed to fetch products.";
      });
  },
});

export default productSlice.reducer;
