import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'shoesStoreActions',
  initialState: {
    catalogTabs: 11,
    navLinks: [
      {to: "/", name: "Главная"},
      {to: "/catalog.html", name: "Каталог"},
      {to: "/about.html", name: "О магазине"},
      {to: "/contacts.html", name: "Контакты"},
    ],
  },

  reducers: {

    setCatalogTabs: (state, action) => {
      state.catalogTabs = action.payload
    },
  },
})

export const {
  setCatalogTabs
} = buyItemSlice.actions

export const SELECTOR_SHOES_STORE_ACTIONS = (state) => state.shoesStoreActions

export const shoesStoreActionsReducer = buyItemSlice.reducer
