import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  cartItemsReducer,
  filtersItemsReducer,
  likesItemsReducer,
  ordersItemsReducer,
  searchReducer,
  shoesStoreActionsReducer
} from "./reducers";
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
  shoesStoreActions: shoesStoreActionsReducer,
  search: searchReducer,
  cartItems: cartItemsReducer,
  ordersItems: ordersItemsReducer,
  likesItems: likesItemsReducer,
  filtersItems: filtersItemsReducer,
  [dataApi.reducerPath]: dataApi.reducer
})



const persistConfig = {
  key: 'root',
  blacklist: ['search', 'shoesStoreActions', 'dataApi', 'filtersItems'],
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
