'use client'
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '../features/modalSlice'
import filterReducer from '../features/filterSlice'
import productsReducer from '../features/productSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filter: filterReducer,
    products: productsReducer,
  },
})
