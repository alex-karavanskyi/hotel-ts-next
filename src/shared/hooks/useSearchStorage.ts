import { useEffect } from 'react'

import { SEARCH_STORAGE_KEY } from '../constants/localStorage'

export const useSearchStorage = (search: string) => {
  useEffect(() => {
    if (!search) {
      localStorage.removeItem(SEARCH_STORAGE_KEY)
      return
    }

    localStorage.setItem(SEARCH_STORAGE_KEY, search)
  }, [search])
}
