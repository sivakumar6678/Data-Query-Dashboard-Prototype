import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  queries: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addQuery: (state, action) => {
      const { query, results } = action.payload;
      state.queries.unshift({
        id: Date.now(),
        query,
        results,
        timestamp: new Date().toISOString(),
      });
    },
    removeQuery: (state, action) => {
      state.queries = state.queries.filter(query => query.id !== action.payload);
    },
    rerunQuery: (state, action) => {
      const query = action.payload;
      // Add the query back to the top of the list
      state.queries = state.queries.filter(q => q.id !== query.id);
      state.queries.unshift({
        ...query,
        id: Date.now(), // Generate a new ID
        timestamp: new Date().toISOString(),
        status: 'pending'
      });
    },
    clearHistory: (state) => {
      state.queries = [];
    },
  },
});

export const { addQuery, removeQuery, rerunQuery, clearHistory } = historySlice.actions;
export default historySlice.reducer; 