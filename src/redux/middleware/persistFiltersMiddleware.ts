import { Middleware } from '@reduxjs/toolkit'
import {
  updateFilters,
  updateSort,
  clearFilters,
  loadProducts,
} from '../features/filterSlice'

const FILTERS_STORAGE_KEY = 'filters_state'

export const persistFiltersMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action)

    if (
      action.type === updateFilters.type ||
      action.type === updateSort.type ||
      action.type === clearFilters.type ||
      action.type === loadProducts.type
    ) {
      if (typeof window !== 'undefined') {
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
