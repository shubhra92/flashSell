import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    isLoading: true,
    Order:null
  };


  export const orderReducer = createReducer(initialState,{

  setOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.Order = action.payload;
  },
  setOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

  })