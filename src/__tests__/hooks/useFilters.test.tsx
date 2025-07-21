import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useFilters } from '@/shared/hooks/useFilters'
import filterReducer from '@/redux/features/filterSlice'
import paginationReducer from '@/redux/features/paginationSlice'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => ''),
  })),
}))

const store = configureStore({
  reducer: {
    filter: filterReducer,
    pagination: paginationReducer,
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useFilters', () => {
  it('should return an object with correct properties', () => {
    const { result } = renderHook(() => useFilters(), { wrapper })

    expect(result.current).toHaveProperty('search')
    expect(result.current).toHaveProperty('setSearch')
    expect(result.current).toHaveProperty('handleFilters')
    expect(result.current).toHaveProperty('handleClearButton')

    expect(typeof result.current.search).toBe('string')
    expect(typeof result.current.setSearch).toBe('function')
    expect(typeof result.current.handleFilters).toBe('function')
    expect(typeof result.current.handleClearButton).toBe('function')
  })
})

describe('useFilters - handleFilters', () => {
  it('should update filters and call router replace', () => {
    const { result } = renderHook(() => useFilters(), { wrapper })

    act(() => {
      result.current.handleFilters('category', 'laptops')
      result.current.handleFilters('price', '1300')
    })
  })
})
