import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    catalogValue: '',
  },

  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setCatalogValue: (state, action) => {
      state.catalogValue = action.payload
    },
  },
})

export const {
  setSearchValue,
  setCatalogValue,
} = buyItemSlice.actions

export const SELECTOR_SEARCH = (state) => state.search

export const searchReducer = buyItemSlice.reducer
