'use client'

import { useSearchParams } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  clearAllFilters,
  updateCategoryFilters,
  updatePriceFilter,
  updateSortFilter,
  updateTextFilter,
} from '@/shared/actions/filterActions'
import { useDebouncedUpdateFilters } from '@/shared/hooks/useDebounceFilters'
import { useSearchStorage } from '@/shared/hooks/useSearchStorage'
import { useStorageSync } from '@/shared/hooks/useStorageSync'
import { FilterName } from '@/shared/types/productsType'
import { createSearchParams } from '@/shared/utils/createSearchParams'

export const useFilters = () => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()

  const debouncedUpdateFilters = useDebouncedUpdateFilters()

  const search = useAppSelector(state => state.filter.filters.text)
  const selectedCategories = useAppSelector(
    state => state.filter.filters.category
  )

  useSearchStorage(search)
  useStorageSync()

  const handleFilters = (
    name: FilterName,
    value: string | number | string[]
  ) => {
    const params = createSearchParams(searchParams)

    switch (name) {
      case FilterName.Price:
        return updatePriceFilter({
          value: Number(value),
          params,
          dispatch,
          debouncedUpdateFilters,
        })

      case FilterName.Text:
        return updateTextFilter({
          value: String(value),
          params,
          dispatch,
          debouncedUpdateFilters,
        })

      case FilterName.Sort:
        return updateSortFilter({
          value: String(value),
          params,
          dispatch,
          debouncedUpdateFilters,
        })

      case FilterName.Category:
        return updateCategoryFilters({
          value: String(value),
          params,
          dispatch,
          selectedCategories,
          debouncedUpdateFilters,
        })

      default:
        return
    }
  }

  const handleClearButton = () => {
    clearAllFilters(dispatch, debouncedUpdateFilters)
  }

  return {
    search,
    handleFilters,
    handleClearButton,
  }
}
