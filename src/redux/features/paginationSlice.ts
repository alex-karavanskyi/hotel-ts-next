'use client'
import { loadPaginationFromStorage } from '@/shared/lib/localStorageFilters'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  pagination: loadPaginationFromStorage(),
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    numberPagination: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload
    },
  },
})

export const { numberPagination } = paginationSlice.actions
export default paginationSlice.reducer
