import {
  GRID_VIEW_STORAGE_KEY,
  PAGINATION_STORAGE_KEY,
} from '@/shared/constants/localStorage'

export const loadGridViewFromStorage = (): boolean => {
  if (typeof window === 'undefined') return true

  const stored = localStorage.getItem(GRID_VIEW_STORAGE_KEY)
  return stored === 'false' ? false : true
}

export const loadPaginationFromStorage = (): number => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(PAGINATION_STORAGE_KEY)
    return stored ? Number(stored) : 1
  }
  return 1
}
