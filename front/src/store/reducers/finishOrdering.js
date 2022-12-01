import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'finishOrdering',
  initialState: {
    phone: '',
    address: '',
    checkbox: false,
    success: 0,
  },

  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload
    },
    setAddress: (state, action) => {
      state.address = action.payload
    },
    setCheckbox: (state, action) => {
      state.checkbox = !state.checkbox
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
  },
})

export const {
  setPhone,
  setAddress,
  setCheckbox,
  setSuccess,
} = buyItemSlice.actions

export const SELECTOR_FINISH_ORDERING = (state) => state.finishOrdering

export const finishOrderingReducer = buyItemSlice.reducer
