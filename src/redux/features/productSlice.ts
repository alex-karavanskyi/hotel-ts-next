'use client'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '@/types/productsType'

interface ProductsState {
  products_loading: boolean
  products_error: boolean
  products: Product[]
  single_product_loading: boolean
  single_product_error: boolean
  single_product: Product | null
}

const initialState: ProductsState = {
  products_loading: false,
  products_error: false,
  products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: null,
}

const fetchData = async <T>(url: string, thunkAPI: any): Promise<T> => {
  try {
    const response = await axios.get<T>(url)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
  }
}

export const getProductsItems = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>('products/getProductsItems', fetchData)

export const getSingleProduct = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('products/getSingleProduct', fetchData)

const handleAsyncState = <T>(
  builder: any,
  asyncThunk: any,
  loadingKey: 'products_loading' | 'single_product_loading',
  errorKey: 'products_error' | 'single_product_error',
  dataKey?: 'products' | 'single_product'
) => {
  builder
    .addCase(asyncThunk.pending, (state: ProductsState) => {
      state[loadingKey] = true
      state[errorKey] = false
    })
    .addCase(
      asyncThunk.fulfilled,
      (state: ProductsState, action: PayloadAction<T>) => {
        state[loadingKey] = false
        if (dataKey) state[dataKey] = action.payload as any
      }
    )
    .addCase(asyncThunk.rejected, (state: ProductsState) => {
      state[loadingKey] = false
      state[errorKey] = true
    })
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncState(
      builder,
      getProductsItems,
      'products_loading',
      'products_error',
      'products'
    )
    handleAsyncState(
      builder,
      getSingleProduct,
      'single_product_loading',
      'single_product_error',
      'single_product'
    )
  },
})

export default productSlice.reducer
