import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    isLoading: true,
    Products :[]
  };


  export const productReducer = createReducer(initialState,{
     // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.Products = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

  })