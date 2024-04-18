'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Products from '@/types/productsType'

export interface FavoriteState {
  favorites_products: Products[]
}

const initialState: FavoriteState = {
  favorites_products: [],
}

interface AddFavoritePayload {
  productId: string | string[]
  products: Products[]
}

interface removeFavoritePayload {
  productId: string | string[]
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<AddFavoritePayload>) => {
      const { productId, products } = action.payload
      const addProducts = products.find((product) => product.id === productId)
      if (addProducts) {
        state.favorites_products.push(addProducts)
      }
    },
    removeFavorite: (state, action: PayloadAction<removeFavoritePayload>) => {
      const { productId } = action.payload
      state.favorites_products = state.favorites_products.filter(
        (product) => product.id !== productId
      )
    },
  },
})
export const { addFavorite, removeFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer
