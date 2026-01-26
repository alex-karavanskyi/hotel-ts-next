import { Middleware } from '@reduxjs/toolkit'

import { FILTERS_STORAGE_KEY } from '@/shared/constants/localStorage'

import {
  clearFilters,
  loadProducts,
  updateFilters,
  updateSort,
} from '../features/filterSlice'

export const persistFiltersMiddleware: Middleware = store => next => action => {
  const result = next(action)

  if (typeof window !== 'undefined') {
    if (
      action.type === updateFilters.type ||
      action.type === updateSort.type ||
      action.type === clearFilters.type ||
      action.type === loadProducts.type
    ) {
      const state = store.getState()
      const { filters, sort } = state.filter
      localStorage.setItem(
        FILTERS_STORAGE_KEY,
        JSON.stringify({ filters, sort })
      )
    }
  }

  return result
}
