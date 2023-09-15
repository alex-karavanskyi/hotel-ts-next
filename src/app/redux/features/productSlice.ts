'use client'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Products from '../modals/productsType'

export interface ProductsState {
  products_loading: boolean
  products_error: boolean
  products: Products[]
  featured_products: Products[]
  single_product_loading: boolean
  single_product_error: boolean
  favorites_products: Products[]
  single_product: Products
}

const initialState: ProductsState = {
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  favorites_products: [],
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
  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<{ productId: string | string[] }>
    ) => {
      const { productId } = action.payload
      const productToAdd = state.products.find(
        (product) => product.id === productId
      )
      if (productToAdd) {
        state.favorites_products.push(productToAdd)
      }
    },
    removeFavorite: (
      state,
      action: PayloadAction<{ productId: string | string[] }>
    ) => {
      const { productId } = action.payload
      state.favorites_products = state.favorites_products.filter(
        (product) => product.id !== productId
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsItems.pending, (state) => {
        state.products_loading = true
      })
      .addCase(getProductsItems.fulfilled, (state, action) => {
        const featured_products = action.payload.filter(
          (product) => product.featured === true
        )
        state.products_loading = false
        state.products = action.payload
        state.featured_products = featured_products
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
export const { addFavorite, removeFavorite } = productSlice.actions
export default productSlice.reducer
