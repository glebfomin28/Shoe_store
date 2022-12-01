import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'orderItem',
  initialState: {
    idItem: '',
    cartNum: 0,
    infoItem: {
      category: null,
      color: "",
      heelSize: "",
      id: null,
      images: [],
      manufacturer: "",
      material: "",
      price: null,
      reason: "",
      season: "",
      sizes:  [],
      sku: "",
      title: "",
    },
    orderList: [],
    sumPrice: 0,
  },

  reducers: {
    setCartNum: (state, action) => {
      state.cartNum = action.payload
    },
    setIdItem: (state, action) => {
      state.idItem = action.payload
    },
    setInfoItem: (state, action) => {
      state.infoItem = action.payload
    },
    setOrderList: (state, action) => {
      const findItem = state.orderList.map(el => el.id).indexOf(action.payload.id);
      if (findItem === -1) {
        state.orderList.unshift(action.payload)
      } else {
        state.orderList[findItem].amount += action.payload.amount
        state.orderList[findItem].fullPrice += action.payload.fullPrice
      }
    },
    deleteItem: (state, action) => {
      state.orderList = state.orderList.filter(v => v.id !== action.payload)
    },
    setFullPrice: (state, action) => {
      let sum = 0;
      state.orderList.map(el =>
        sum += el.fullPrice
      )
      state.sumPrice = sum
    },
    deleteOrderList: (state, action) => {
      state.orderList = []
    },

  },
})

export const {
  setCartNum,
  setIdItem,
  setInfoItem,
  setOrderList,
  deleteItem,
  setFullPrice,
  deleteOrderList
} = buyItemSlice.actions

export const SELECTOR_ORDER_ITEM = (state) => state.orderItem

export const orderItemReducer = buyItemSlice.reducer
