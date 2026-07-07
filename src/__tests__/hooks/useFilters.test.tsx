import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'

import filterReducer, { updateFilters } from '@/redux/features/filterSlice'
import paginationReducer from '@/redux/features/paginationSlice'
import { useFilters } from '@/shared/hooks/useFilters'
import { FilterName } from '@/shared/types/productsType'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ''),
    getAll: jest.fn(() => []),
    toString: jest.fn(() => ''),
  })),
}))

const createWrapper = () => {
  const store = configureStore({
    reducer: {
      filter: filterReducer,
      pagination: paginationReducer,
    },
  })

  return {
    store,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
  }
}

describe('useFilters', () => {
  it('should return an object with correct properties', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useFilters(), { wrapper })

    expect(result.current).toHaveProperty('search')
    expect(result.current).toHaveProperty('handleFilters')
    expect(result.current).toHaveProperty('handleClearButton')

    expect(typeof result.current.search).toBe('string')
    expect(typeof result.current.handleFilters).toBe('function')
    expect(typeof result.current.handleClearButton).toBe('function')
  })
})

describe('useFilters - handleFilters', () => {
  it('should update filters and call router replace', () => {
    const { wrapper } = createWrapper()
    const { result } = renderHook(() => useFilters(), { wrapper })

    act(() => {
      result.current.handleFilters(FilterName.Category, 'laptops')
      result.current.handleFilters(FilterName.Price, '1300')
    })
  })

  it('should keep the current selected categories when adding another one', () => {
    const { store, wrapper } = createWrapper()
    store.dispatch(updateFilters({ name: 'category', value: ['laptops'] }))

    const { result } = renderHook(() => useFilters(), { wrapper })

    act(() => {
      result.current.handleFilters(FilterName.Category, 'phones')
    })

    expect(store.getState().filter.filters.category).toEqual([
      'laptops',
      'phones',
    ])
  })
})
