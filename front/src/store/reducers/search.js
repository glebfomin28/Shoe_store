import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
    catalogValue: '',
  },

  reducers: {
    // поиск в хедере
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    // поиск в каталоге
    setCatalogValue: (state, action) => {
      state.catalogValue = action.payload
    },
    // передать значение в поиск каталога
    getSearchValue: (state, action) => {
      state.catalogValue = state.searchValue
    },
    // очистить все value
    cleaningValues: (state, action) => {
      state.searchValue = ''
      state.catalogValue = ''
    },
  },
})

export const {
  setSearchValue,
  setCatalogValue,
  getSearchValue,
  cleaningValues
} = buyItemSlice.actions

export const SELECTOR_SEARCH = (state) => state.search

export const searchReducer = buyItemSlice.reducer
