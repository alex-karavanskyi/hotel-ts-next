'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Products } from '@/types/productsType'

interface AddFavoritePayload {
  productId: string | string[]
  products: Products[]
}

interface RemoveFavoritePayload {
  productId: string | string[]
}
interface FavoriteState {
  favorites_products: Products[]
}

const initialState: FavoriteState = {
  favorites_products: [],
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<AddFavoritePayload>) => {
      const { productId, products } = action.payload
      const productIds = Array.isArray(productId) ? productId : [productId]

      productIds.forEach((id) => {
        if (!state.favorites_products.some((product) => product.id === id)) {
          const productToAdd = products.find((product) => product.id === id)
          if (productToAdd) {
            state.favorites_products.push(productToAdd)
          }
        }
      })
    },
    removeFavorite: (state, action: PayloadAction<RemoveFavoritePayload>) => {
      const { productId } = action.payload
      const productIds = Array.isArray(productId) ? productId : [productId]

      state.favorites_products = state.favorites_products.filter(
        (product) => !productIds.includes(product.id)
      )
    },
  },
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
