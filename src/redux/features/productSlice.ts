'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '@/types/productsType'

interface ProductsState {
  products_loading: boolean
  products_error: boolean
  products: Product[]
  single_product_loading: boolean
  single_product_error: boolean
  single_product: Product
}

const initialState: ProductsState = {
  products_loading: false,
  products_error: false,
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {} as Product,
}

export const getProductsItems = createAsyncThunk<
  Product[],
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
  Product,
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
