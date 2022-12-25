import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'filtersItems',
  initialState: {
    filersObj: {
      division: [],
      minPrice: '',
      maxPrice: '',
      color: [],
      sizes: [],
      reason: [],
      season: [],
      brand: []
    },
  },

  reducers: {
    // division
    addDivision: (state, action) => {
      state.filersObj.division.push(action.payload)
    },
    removeDivision: (state, action) => {
      state.filersObj.division = state.filersObj.division.filter(v => v !== action.payload)
    },
    // price
    setMinPrice: (state, action) => {
      state.filersObj.minPrice = action.payload
    },
    setMaxPrice: (state, action) => {
      state.filersObj.maxPrice = action.payload
    },
    // color
    addColor: (state, action) => {
      state.filersObj.color.push(action.payload)
    },
    removeColor: (state, action) => {
      state.filersObj.color = state.filersObj.color.filter(v => v !== action.payload)
    },
    // sizes
    addSizes: (state, action) => {
      state.filersObj.sizes.push(action.payload)
    },
    removeSizes: (state, action) => {
      state.filersObj.sizes = state.filersObj.sizes.filter(v => v !== action.payload)
    },
    // reason
    addReason: (state, action) => {
      state.filersObj.reason.push(action.payload)
    },
    removeReason: (state, action) => {
      state.filersObj.reason = state.filersObj.reason.filter(v => v !== action.payload)
    },
    // season
    addSeason: (state, action) => {
      state.filersObj.season.push(action.payload)
    },
    removeSeason: (state, action) => {
      state.filersObj.season = state.filersObj.season.filter(v => v !== action.payload)
    },
    // brand
    addBrand: (state, action) => {
      state.filersObj.brand.push(action.payload)
    },
    removeBrand: (state, action) => {
      state.filersObj.brand = state.filersObj.brand.filter(v => v !== action.payload)
    },
  },
})

export const {
  addDivision,
  removeDivision,
  setMinPrice,
  setMaxPrice,
  addColor,
  removeColor,
  addSizes,
  removeSizes,
  addReason,
  removeReason,
  addSeason,
  removeSeason,
  addBrand,
  removeBrand
} = buyItemSlice.actions

export const FILTERS_ITEMS = (state) => state.filtersItems

export const filtersItemsReducer = buyItemSlice.reducer
