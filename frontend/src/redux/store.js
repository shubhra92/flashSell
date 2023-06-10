import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./reducer/order";
import { productReducer } from "./reducer/product";
import { searchStrReducer } from "./reducer/searchStr";
import { userReducer } from "./reducer/user";




const Store = configureStore({
    reducer:{
        Products: productReducer,
        SearchStr:searchStrReducer,
        User:userReducer,
        Order:orderReducer
    }
})

export default Store;