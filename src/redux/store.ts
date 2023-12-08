'use client'
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/redux/features/modalSlice'
import filterReducer from '@/redux/features/filterSlice'
import productsReducer from '@/redux/features/productSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    filter: filterReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
