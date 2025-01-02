import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useAppDispatch } from '@/redux/hooks'
import { numberPagination } from '@/redux/features/paginationSlice'
import {
  updateFilters,
  updateSort,
  clearFilters,
} from '@/redux/features/filterSlice'

export const useFilters = () => {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  )

  const debouncedUpdateFilters = useDebouncedCallback(
    (updatedParams: URLSearchParams) => {
      replace(`${window.location.pathname}?${updatedParams.toString()}`)
    },
    500
  )

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
      } else {
        updatedParams.set('search', value as string)
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
    const updatedParams = new URLSearchParams()
    replace(`${window.location.pathname}?${updatedParams.toString()}`)
  }

  return {
    search,
    setSearch,
    handleFilters,
    handleClearButton,
  }
}
