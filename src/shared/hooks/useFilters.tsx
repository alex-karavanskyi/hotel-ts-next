'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { numberPagination } from '@/redux/features/paginationSlice'
import { useDebouncedUpdateFilters } from '@/shared/utils/debounceFilters'
import {
  updateFilters,
  updateSort,
  clearFilters,
} from '@/redux/features/filterSlice'

const SEARCH_STORAGE_KEY = 'search'

export const useFilters = () => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const debouncedUpdateFilters = useDebouncedUpdateFilters()

  const [search, setSearch] = useState(
    searchParams.get(SEARCH_STORAGE_KEY)?.toString() ||
      localStorage.getItem(SEARCH_STORAGE_KEY) ||
      ''
  )

  useEffect(() => {
    localStorage.setItem(SEARCH_STORAGE_KEY, search)
  }, [search])

  useEffect(() => {
    const syncStorage = (e: StorageEvent) => {
      if (e.key === 'search' && typeof e.newValue === 'string') {
        setSearch(e.newValue)
        dispatch(updateFilters({ name: 'text', value: e.newValue }))
        dispatch(numberPagination(1))
        const updatedParams = new URLSearchParams(searchParams.toString())
        if (e.newValue) {
          updatedParams.set(SEARCH_STORAGE_KEY, e.newValue)
        } else {
          updatedParams.delete(SEARCH_STORAGE_KEY)
        }
        debouncedUpdateFilters(updatedParams)
      }
    }

    window.addEventListener('storage', syncStorage)
    return () => window.removeEventListener('storage', syncStorage)
  }, [dispatch, debouncedUpdateFilters, searchParams])

  const handleFilters = (name: string, value: string | number) => {
    const updatedParams = new URLSearchParams(searchParams.toString())

    if (name === 'category') {
      updatedParams.set('category', value as string)
    }
    if (name === 'price') {
      updatedParams.set('price', value.toString())
    }
    if (name === 'text') {
      setSearch(value as string)
      if (value === '') {
        updatedParams.delete('search')
        localStorage.removeItem('search')
      } else {
        updatedParams.set('search', value as string)
        localStorage.setItem('search', value as string)
      }
    }
    if (name === 'sort') {
      dispatch(updateSort(value as string))
      updatedParams.set('sort', value as string)
    }

    dispatch(updateFilters({ name, value }))
    dispatch(numberPagination(1))
    debouncedUpdateFilters(updatedParams)
  }

  const handleClearButton = () => {
    dispatch(clearFilters())
    dispatch(numberPagination(1))
    setSearch('')
    localStorage.removeItem('search')
    const updatedParams = new URLSearchParams()
    debouncedUpdateFilters(updatedParams)
  }

  return {
    search,
    setSearch,
    handleFilters,
    handleClearButton,
  }
}
