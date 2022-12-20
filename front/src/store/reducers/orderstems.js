import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'ordersItems',
  initialState: {
    ordersList: [],
  },

  reducers: {
    setOrderList: (state, action) => {
      state.ordersList = action.payload
    },
    deleteOrder: (state, action) => {
      state.ordersList = state.ordersList.filter(v => v.id !== action.payload)
    },
    deleteOrderList: (state, action) => {
      state.ordersList = []
    },
  },
})

export const {
  setOrderList,
  deleteOrder,
  deleteOrderList,
} = buyItemSlice.actions

export const SELECTOR_ORDERS_ITEMS = (state) => state.ordersItems

export const ordersItemsReducer = buyItemSlice.reducer