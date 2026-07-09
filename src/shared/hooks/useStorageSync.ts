import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import { updateFilters } from '@/redux/features/filterSlice'
import { numberPagination } from '@/redux/features/paginationSlice'
import { useAppDispatch } from '@/redux/hooks'

import { SEARCH_STORAGE_KEY } from '../constants/localStorage'
import { FilterName } from '../types/productsType'
import { createSearchParams } from '../utils/createSearchParams'

import { useDebouncedUpdateFilters } from './useDebounceFilters'

export const useStorageSync = () => {
  const dispatch = useAppDispatch()

  const searchParams = useSearchParams()

  const debouncedUpdateFilters = useDebouncedUpdateFilters()

  useEffect(() => {
    const syncStorage = (e: StorageEvent) => {
      if (e.key !== SEARCH_STORAGE_KEY) return

      dispatch(
        updateFilters({
          name: FilterName.Text,
          value: e.newValue ?? '',
        })
      )

      dispatch(numberPagination(1))

      const params = createSearchParams(searchParams)

      if (e.newValue) params.set(FilterName.Text, e.newValue)
      else params.delete(FilterName.Text)

      debouncedUpdateFilters(params)
    }

    window.addEventListener('storage', syncStorage)

    return () => window.removeEventListener('storage', syncStorage)
  }, [debouncedUpdateFilters, dispatch, searchParams])
}
