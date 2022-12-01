import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {finishOrderingReducer, orderItemReducer, searchReducer, shoesListReducer} from "./reducers";
import { persistStore, persistReducer } from'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  shoesList: shoesListReducer,
  search: searchReducer,
  orderItem: orderItemReducer,
  finishOrdering: finishOrderingReducer,
})

const persistConfig = {
  key: 'root',
  blacklist: ['search', 'shoesList', 'finishOrdering'],
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
