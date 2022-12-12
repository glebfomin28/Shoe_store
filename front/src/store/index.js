import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {finishOrderingReducer, orderItemReducer, searchReducer, shoesListReducer} from "./reducers";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from'redux-persist';
import storage from 'redux-persist/lib/storage';
import { dataApi } from "./RTKQuery";

const rootReducer = combineReducers({
  shoesList: shoesListReducer,
  search: searchReducer,
  orderItem: orderItemReducer,
  finishOrdering: finishOrderingReducer,
  [dataApi.reducerPath]: dataApi.reducer
})



const persistConfig = {
  key: 'root',
  blacklist: ['search', 'shoesList', 'finishOrdering', 'dataApi'],
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(dataApi.middleware),
})

export const persistor = persistStore(store)
