import modalReducer from '@/redux/features/modalSlice'
import filterReducer from '@/redux/features/filterSlice'
import productReducer from '@/redux/features/productSlice'
import paginationSlice from '@/redux/features/paginationSlice'
import favoriteSlice from '@/redux/features/favoriteSlice'
import { configureStore } from '@reduxjs/toolkit'
import { persistFiltersMiddleware } from './middleware/persistFiltersMiddleware'
import { persistGridViewMiddleware } from './middleware/persistGridViewMiddleware'
import { persistPaginationMiddleware } from './middleware/persistPaginationMiddleware'

export const store = configureStore({
  reducer: {
    favorite: favoriteSlice,
    filter: filterReducer,
    modal: modalReducer,
    pagination: paginationSlice,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistFiltersMiddleware,
      persistGridViewMiddleware,
      persistPaginationMiddleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
