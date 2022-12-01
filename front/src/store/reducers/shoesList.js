import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'shoesList',
  initialState: {
    bestseller: [],
    categories: [],
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
    setBestseller: (state, action) => {
      state.bestseller = action.payload
    },
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
    setCategories: (state, action) => {
      state.categories = action.payload
      state.categories.unshift({id: 11, title: "Все"})
    },
    setCatalogTabs: (state, action) => {
      state.catalogTabs = action.payload
    },
  },
})

export const {
  setBestseller,
  setCatalog,
  setCatalogFilter,
  setAddCatalog,
  setCategories,
  setCatalogTabs
} = buyItemSlice.actions

export const SELECTOR_SHOES_LIST = (state) => state.shoesList

export const shoesListReducer = buyItemSlice.reducer
