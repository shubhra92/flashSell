import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    SearchStr:''
  };

  export const searchStrReducer = createReducer(initialState,{
 searchRequest: (state,action) => {
   state.SearchStr = action.payload;
 }
 })