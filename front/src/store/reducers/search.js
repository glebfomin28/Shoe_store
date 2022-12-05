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
      state.catalogValue =  action.payload
    },
    getSearchValue: (state, action) => {
      state.catalogValue =  state.searchValue
    },
  },
})

export const {
  setSearchValue,
  setCatalogValue,
  getSearchValue
} = buyItemSlice.actions

export const SELECTOR_SEARCH = (state) => state.search

export const searchReducer = buyItemSlice.reducer
