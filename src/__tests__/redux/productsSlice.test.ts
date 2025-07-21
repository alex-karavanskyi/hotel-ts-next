import reducer, { getProductsItems } from '@/redux/features/productSlice'
import axios from 'axios'
import thunk from 'redux-thunk'
import { Product } from '@/shared/types/productsType'
import { configureStore } from '@reduxjs/toolkit'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
    images: [],
    image: 'img.jpg',
    description: 'Desc',
    category: 'Laptops',
  },
]

describe('productsSlice', () => {
  it('should handle initial state', () => {
    const initialState = reducer(undefined, { type: 'unknown' })
    expect(initialState.products).toEqual([])
    expect(initialState.products_loading).toBe(false)
    expect(initialState.products_error).toBe(false)
  })

  it('should handle getProductsItems fulfilled', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts })

    const store = configureStore({
      reducer: { products: reducer },
      middleware: [thunk],
    })

    await store.dispatch(getProductsItems('/api/products') as any)

    const state = store.getState().products

    expect(state.products_loading).toBe(false)
    expect(state.products_error).toBe(false)
    expect(state.products).toEqual(mockProducts)
  })

  it('should handle getProductsItems rejected', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Fetch failed'))

    const store = configureStore({
      reducer: { products: reducer },
      middleware: [thunk],
    })

    await store.dispatch(getProductsItems('/api/products') as any)

    const state = store.getState().products

    expect(state.products_loading).toBe(false)
    expect(state.products_error).toBe(true)
    expect(state.products).toEqual([])
  })
})
