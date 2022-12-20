
import { createSlice } from '@reduxjs/toolkit'

const buyItemSlice = createSlice({
  name: 'likesItems',
  initialState: {
    likesList: [],
  },

  reducers: {

    setLikesList: (state, action) => {
      const findItem = state.likesList.map(el => el.id).indexOf(action.payload.id);
      if (findItem === -1) {
        state.likesList.unshift(action.payload)
      } else {
        state.likesList = state.likesList.filter(v => v.id !== action.payload.id)
      }
    },
    deleteLikes: (state, action) => {
      state.likesList = state.likesList.filter(v => v.id !== action.payload)
    },
    deleteLikesList: (state, action) => {
      state.likesList = []
    },
  },
})

export const {
  setLikesList,
  deleteLikes,
  deleteLikesList
} = buyItemSlice.actions

export const SELECTOR_LIKES_ITEMS = (state) => state.likesItems

export const likesItemsReducer = buyItemSlice.reducer
