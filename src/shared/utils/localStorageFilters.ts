import { FilterState } from '@/shared/types/productsType'

const GRID_VIEW_STORAGE_KEY = 'grid_view'
const FILTERS_STORAGE_KEY = 'filters_state'
const PAGINATION_STORAGE_KEY = 'pagination'

export const loadFiltersFromStorage = (): Pick<
  FilterState,
  'filters' | 'sort'
> | null => {
  if (typeof window === 'undefined') return null

  try {
    const data = localStorage.getItem(FILTERS_STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

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
