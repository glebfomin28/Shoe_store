import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'cartItems',
  initialState: {
    idItem: '',
    cartList: [],
    sumPrice: null
  },

  reducers: {
    setIdItem: (state, action) => {
      state.idItem = action.payload
    },
    setChangeAmountPlus: (state, action) => {
      const findItem = state.cartList.map(el => el.id).indexOf(action.payload);
      if (findItem !== -1) {
        if (state.cartList[findItem].amount < 10) {
          state.cartList[findItem].amount += 1
        }
      }
    },
    setChangeAmountMinus: (state, action) => {
      const findItem = state.cartList.map(el => el.id).indexOf(action.payload);
      if (findItem !== -1) {
        if (state.cartList[findItem].amount > 1) {
          state.cartList[findItem].amount -= 1
        }
      }
    },
    setChangeFullPrice: (state, action) => {
      const findItem = state.cartList.map(el => el.id).indexOf(action.payload);
      if (findItem !== -1) {
        state.cartList[findItem].fullPrice =
          state.cartList[findItem].amount * state.cartList[findItem].price
      }
    },
    setCartList: (state, action) => {
      const findItemId = state.cartList.map(el => el.id).indexOf(action.payload.id);
      console.log(action.payload.id)
      if (findItemId === -1) {
        state.cartList.unshift(action.payload)
      }
      else if (findItemId !== -1 && state.cartList[findItemId].size === action.payload.size) {
        state.cartList[findItemId].amount += action.payload.amount
        state.cartList[findItemId].fullPrice += action.payload.fullPrice
      } else {
        state.cartList.unshift(action.payload)
      }
    },
    deleteItem: (state, action) => {
      state.cartList = state.cartList.filter(v => v.id !== action.payload)
    },
    setFullPrice: (state, action) => {
      let sum = 0;
      state.cartList.map(el =>
        sum += el.fullPrice
      )
      state.sumPrice = sum
    },
    deleteCartList: (state, action) => {
      state.cartList = []
    },

  },
})

export const {
  setIdItem,
  setCartList,
  deleteItem,
  setFullPrice,
  deleteCartList,
  setChangeAmountPlus,
  setChangeAmountMinus,
  setChangeFullPrice
} = buyItemSlice.actions

export const SELECTOR_CART_ITEMS = (state) => state.cartItems

export const cartItemsReducer = buyItemSlice.reducer
