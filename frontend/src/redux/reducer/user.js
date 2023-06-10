import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    isLoading: true,
    User:null
  };


  export const userReducer = createReducer(initialState,{

  userSuccess: (state, action) => {
    state.isLoading = false;
    state.User= action.payload;
  },
  userFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },

  })