import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './querySlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    history: historyReducer,
  },
}); 