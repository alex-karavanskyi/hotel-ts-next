'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Products from '@/types/productsType'

export interface ProductsState {
  products_loading: boolean
  products_error: boolean
  products: Products[]
  single_product_loading: boolean
  single_product_error: boolean
  single_product: Products
}

const initialState: ProductsState = {
  products_loading: false,
  products_error: false,
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as Products,
}

export const getProductsItems = createAsyncThunk<
  Products[],
  string,
  { rejectValue: string }
>('products/getProductsItems', async (url, thunkAPI) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong')
  }
})

export const getSingeProduct = createAsyncThunk<
  Products,
  string,
  { rejectValue: string }
>('products/getSingeProduct', async (url, thunkAPI) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong')
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsItems.pending, (state) => {
        state.products_loading = true
      })
      .addCase(getProductsItems.fulfilled, (state, action) => {
        state.products_loading = false
        state.products = action.payload
      })
      .addCase(getProductsItems.rejected, (state) => {
        state.products_loading = false
        state.products_error = true
      })
      .addCase(getSingeProduct.pending, (state) => {
        state.single_product_loading = true
        state.single_product_error = false
      })
      .addCase(getSingeProduct.fulfilled, (state, action) => {
        state.single_product_loading = false
        state.single_product = action.payload
      })
      .addCase(getSingeProduct.rejected, (state) => {
        state.single_product_loading = false
        state.single_product_error = true
      })
  },
})

export default productSlice.reducer
