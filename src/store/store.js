import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./querySlice";
import historyReducer from "./historySlice";
import suggestionsReducer from "./suggestionsSlice";

const store = configureStore({
  reducer: {
    query: queryReducer,
    history: historyReducer,
    suggestions: suggestionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
