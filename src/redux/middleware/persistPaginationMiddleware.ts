import { Middleware } from '@reduxjs/toolkit'

import { PAGINATION_STORAGE_KEY } from '@/shared/constants/localStorage'

import { numberPagination } from '../features/paginationSlice'

export const persistPaginationMiddleware: Middleware =
  store => next => action => {
    const result = next(action)

    if (typeof window !== 'undefined') {
      if (action.type === numberPagination.type) {
        localStorage.setItem(PAGINATION_STORAGE_KEY, action.payload.toString())
      }
    }

    return result
  }
