'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Products from '@/types/productsType'

export interface FilterState {
  filtered_products: Products[]
  all_products: Products[]
  grid_view: boolean
  sort: string
  filters: {
    text: string
    category: string
    min_price: number
    max_price: number
    price: number
    [index: string]: string | number
  }
}

const initialState: FilterState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Products[]>) => {
      const { payload } = action
      const maxPrice = Math.max(...payload.map((item: Products) => item.price))
      state.all_products = payload
      state.filtered_products = payload
      state.filters.max_price = maxPrice
      state.filters.price = maxPrice
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
    updateFilters: (state, action) => {
      const { payload } = action
      const { name, value } = payload
      state.filters[name] = value
    },
    filterProducts: (state) => {
      const { all_products } = state
      const { text, category, price } = state.filters
      let tempProducts = [...all_products]
      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        )
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }
      tempProducts = tempProducts.filter((product) => product.price <= price)
      state.filtered_products = tempProducts
    },
    clearFilters: (state) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          price: state.filters.max_price,
        },
      }
    },
    sortProducts: (state) => {
      const { sort, filtered_products } = state
      let tempProducts = [...filtered_products]
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
      }
      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
      }
      state.filtered_products = tempProducts
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
