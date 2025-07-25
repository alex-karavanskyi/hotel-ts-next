import { Middleware } from '@reduxjs/toolkit'
import { setGridView, setListView } from '../features/filterSlice'

const GRID_VIEW_STORAGE_KEY = 'grid_view'

export const persistGridViewMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action)

    if (typeof window !== 'undefined') {
      try {
        if (action.type === setGridView.type) {
          localStorage.setItem(GRID_VIEW_STORAGE_KEY, 'true')
        }
        if (action.type === setListView.type) {
          localStorage.setItem(GRID_VIEW_STORAGE_KEY, 'false')
        }
      } catch (err) {
        console.error('Failed to persist grid view:', err)
      }
    }

    return result
  }
