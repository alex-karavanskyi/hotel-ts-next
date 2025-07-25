import { Middleware } from '@reduxjs/toolkit'
import { numberPagination } from '../features/paginationSlice'

const PAGINATION_STORAGE_KEY = 'pagination'

export const persistPaginationMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action)

    if (action.type === numberPagination.type) {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            PAGINATION_STORAGE_KEY,
            action.payload.toString()
          )
        } catch (err) {
          console.error('Failed to persist pagination:', err)
        }
      }
    }

    return result
  }
