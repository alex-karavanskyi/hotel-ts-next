'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pagination: 1,
}

const paginationSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    numberPagination: (state, action) => {
      state.pagination = action.payload
    },
  },
})

export const { numberPagination } = paginationSlice.actions
export default paginationSlice.reducer
