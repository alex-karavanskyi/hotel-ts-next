'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, FilterState } from '@/shared/types/productsType'
import {
  loadFiltersFromStorage,
  loadGridViewFromStorage,
} from '@/shared/utils/localStorageFilters'

const initialGridView = loadGridViewFromStorage()

const initialState: FilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: initialGridView,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
  },
}

const savedState = loadFiltersFromStorage()
if (savedState) {
  initialState.filters = {
    ...initialState.filters,
    ...savedState.filters,
  }
  initialState.sort = savedState.sort
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Product[]>) => {
      const products = action.payload
      const prices = products.map((product) => product.price)
      const maxPrice = Math.max(...prices)
      const minPrice = Math.min(...prices)

      state.all_products = products
      state.filters.min_price = minPrice
      state.filters.max_price = maxPrice
      if (state.filters.price === 0) {
        state.filters.price = maxPrice
      }
    },
    setGridView: (state) => {
      state.grid_view = true
    },
    setListView: (state) => {
      state.grid_view = false
    },
    updateSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    updateFilters: (
      state,
      action: PayloadAction<{ name: string; value: string | number }>
    ) => {
      const { name, value } = action.payload
      state.filters[name] = value
    },
    filterProducts: (state) => {
      const { all_products, filters } = state
      const { text, category, price } = filters

      state.filtered_products = all_products.filter((product) => {
        return (
          (!text ||
            product.name.toLowerCase().startsWith(text.toLowerCase())) &&
          (category === 'all' || product.category === category) &&
          product.price <= price
        )
      })
    },
    sortProducts: (state) => {
      const { sort, filtered_products } = state

      const sorted = [...filtered_products].sort((a, b) => {
        if (sort === 'price-lowest') return a.price - b.price
        if (sort === 'price-highest') return b.price - a.price
        if (sort === 'name-a') return a.name.localeCompare(b.name)
        if (sort === 'name-z') return b.name.localeCompare(a.name)
        return 0
      })

      state.filtered_products = sorted
    },
    clearFilters: (state) => {
      const { max_price } = state.filters

      state.filters = {
        ...state.filters,
        text: '',
        category: 'all',
        price: max_price,
      }
      state.sort = 'price-lowest'
    },
  },
})

export const {
  loadProducts,
  setGridView,
  setListView,
  updateSort,
  updateFilters,
  clearFilters,
  filterProducts,
  sortProducts,
} = filterSlice.actions

export default filterSlice.reducer
