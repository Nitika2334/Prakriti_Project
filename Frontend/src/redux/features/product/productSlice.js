import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../pages/AddProduct/productService';
import {toast} from "react-toastify";

const initialState = {
    product:null,
    isError:false,
    isSuccess:false,
    isLoading :false,
    products:[],

};

export const createProduct=createAsyncThunk(
    "product/createProduct",
    async (productData,thunkAPI) => {
      try {
        return await productService.createProduct(productData);
      } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message) 
        || error.message
        || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
);

const productSlice= createSlice({
    name:"product",
    initialState,
    reducers:{
        RESET_PRODUCT(state){
            state.isError=false;
            state.isSuccess=false;
            state.isLoading=false;
        },
    },
    extraReducers:()=>{
        builder
        .addCase(createProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.product=action.payload;
            toast.success("Product created successfully");
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=true;
            state.product=action.payload;
            toast.success("Product created successfully");
        })
        
        
    }
})