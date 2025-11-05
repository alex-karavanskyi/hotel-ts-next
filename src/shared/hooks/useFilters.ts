'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { numberPagination } from '@/redux/features/paginationSlice'
import { useDebouncedUpdateFilters } from '@/shared/hooks/useDebounceFilters'
import { FilterName } from '@/shared/types/productsType'
import { SEARCH_STORAGE_KEY } from '@/shared/constants/localStorage'
import {
  updateFilters,
  updateSort,
  clearFilters,
} from '@/redux/features/filterSlice'

export const useFilters = () => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const debouncedUpdateFilters = useDebouncedUpdateFilters()

  const search = useAppSelector((state) => state.filter.filters.text)

  useEffect(() => {
    if (search !== undefined) {
      search === ''
        ? localStorage.removeItem(SEARCH_STORAGE_KEY)
        : localStorage.setItem(SEARCH_STORAGE_KEY, search)
    }
  }, [search])

  useEffect(() => {
    const syncStorage = (e: StorageEvent) => {
      if (e.key === SEARCH_STORAGE_KEY && typeof e.newValue === 'string') {
        dispatch(updateFilters({ name: 'text', value: e.newValue }))
        dispatch(numberPagination(1))

        const updatedParams = new URLSearchParams(searchParams.toString())

        e.newValue
          ? updatedParams.set(SEARCH_STORAGE_KEY, e.newValue)
          : updatedParams.delete(SEARCH_STORAGE_KEY)

        debouncedUpdateFilters(updatedParams)
      }
    }

    window.addEventListener('storage', syncStorage)
    return () => window.removeEventListener('storage', syncStorage)
  }, [dispatch, debouncedUpdateFilters, searchParams])

  const handleFilters = <T extends string | number>(
    name: FilterName,
    value: T
  ) => {
    const updatedParams = new URLSearchParams(searchParams.toString())

    switch (name) {
      case FilterName.Category:
        updatedParams.set(FilterName.Category, String(value))
        break

      case FilterName.Price:
        updatedParams.set(FilterName.Price, String(value))
        break

      case FilterName.Text:
        if (value === '') {
          updatedParams.delete(SEARCH_STORAGE_KEY)
          localStorage.removeItem(SEARCH_STORAGE_KEY)
        } else {
          updatedParams.set(SEARCH_STORAGE_KEY, String(value))
          localStorage.setItem(SEARCH_STORAGE_KEY, String(value))
        }
        break

      case FilterName.Sort:
        dispatch(updateSort(String(value)))
        updatedParams.set(FilterName.Sort, String(value))
        break
    }

    dispatch(updateFilters({ name, value }))
    dispatch(numberPagination(1))
    debouncedUpdateFilters(updatedParams)
  }

  const handleClearButton = () => {
    dispatch(clearFilters())
    dispatch(numberPagination(1))
    localStorage.removeItem(SEARCH_STORAGE_KEY)
    const updatedParams = new URLSearchParams()
    debouncedUpdateFilters(updatedParams)
  }

  return {
    search,
    handleFilters,
    handleClearButton,
  }
}
