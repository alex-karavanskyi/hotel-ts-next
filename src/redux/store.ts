'use client'
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/redux/features/modalSlice'
import filterReducer from '@/redux/features/filterSlice'
import productReducer from '@/redux/features/productSlice'
import paginationSlice from '@/redux/features/paginationSlice'
import favoriteSlice from '@/redux/features/favoriteSlice'

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    filter: filterReducer,
    modal: modalReducer,
    pagination: paginationSlice,
    products: productReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
