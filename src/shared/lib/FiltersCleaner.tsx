'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { clearFilters } from '@/redux/features/filterSlice'
import { numberPagination } from '@/redux/features/paginationSlice'

const FiltersCleaner = () => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isHomePage = pathname === '/' || pathname === '/home'

    if (!isHomePage) {
      localStorage.removeItem('filters_state')
      localStorage.removeItem('pagination')
      localStorage.removeItem('grid_view')

      dispatch(clearFilters())
      dispatch(numberPagination(1))
    }
  }, [pathname, dispatch])

  return null
}

export default FiltersCleaner
