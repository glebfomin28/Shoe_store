import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'shoesList',
  initialState: {
    catalog: [],
    catalogTabs: 11,
    navLinks: [
      {to: "/", name: "Главная"},
      {to: "/catalog.html", name: "Каталог"},
      {to: "/about.html", name: "О магазине"},
      {to: "/contacts.html", name: "Контакты"},
    ],
  },

  reducers: {
    setCatalog: (state, action) => {
      state.catalog = action.payload
    },
    setCatalogFilter: (state, action) => {
      state.catalog = action.payload
        .filter((v) =>
          state.catalogTabs === 11
            ? true
            : v.category === state.catalogTabs
        )
    },
    setAddCatalog: (state, action) => {
      state.catalog = [...state.catalog, ...action.payload]
    },
    setCatalogTabs: (state, action) => {
      state.catalogTabs = action.payload
    },
  },
})

export const {
  setCatalog,
  setCatalogFilter,
  setAddCatalog,
  setCatalogTabs
} = buyItemSlice.actions

export const SELECTOR_SHOES_LIST = (state) => state.shoesList

export const shoesListReducer = buyItemSlice.reducer
