import {combineReducers} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import AuthSlice from './slices/AuthSlice';
import AppSlice from './slices/AppSlice';
import SubscriptionSlice from './slices/SubscriptionSlice';
import logger from 'redux-logger';
import {Actions} from '../constants/Actions';

const rootReducer = combineReducers({
  auth: AuthSlice,
  app: AppSlice,
  subscription: SubscriptionSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  // Add blacklist or whitelist configurations if needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
