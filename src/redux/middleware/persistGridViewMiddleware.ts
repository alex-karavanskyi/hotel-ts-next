import { Middleware } from '@reduxjs/toolkit'

import { GRID_VIEW_STORAGE_KEY } from '@/shared/constants/localStorage'

import { setGridView, setListView } from '../features/filterSlice'

export const persistGridViewMiddleware: Middleware =
  store => next => action => {
    const result = next(action)

    if (typeof window !== 'undefined') {
      if (action.type === setGridView.type) {
        localStorage.setItem(GRID_VIEW_STORAGE_KEY, 'true')
      }
      if (action.type === setListView.type) {
        localStorage.setItem(GRID_VIEW_STORAGE_KEY, 'false')
      }
    }

    return result
  }
