import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'query_history';

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return { queries: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading history from localStorage:', err);
    return { queries: [] };
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving history to localStorage:', err);
  }
};

const initialState = loadState();

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addQuery: (state, action) => {
      const { text, mode, timestamp, status } = action.payload;
      
      // Check for duplicate queries (same text and timestamp)
      const isDuplicate = state.queries.some(
        q => q.text === text && q.timestamp === timestamp
      );

      if (!isDuplicate) {
        // Add new query at the beginning of the array
        state.queries.unshift({
          text,
          mode,
          timestamp,
          status: status || 'pending'
        });

        // Keep only the last 50 queries
        if (state.queries.length > 50) {
          state.queries = state.queries.slice(0, 50);
        }

        // Save to localStorage
        saveState(state);
      }
    },
    removeQuery: (state, action) => {
      state.queries = state.queries.filter(query => query.timestamp !== action.payload);
      saveState(state);
    },
    clearHistory: (state) => {
      state.queries = [];
      localStorage.removeItem(STORAGE_KEY);
    },
    updateQueryStatus: (state, action) => {
      const { timestamp, status } = action.payload;
      const query = state.queries.find(q => q.timestamp === timestamp);
      if (query) {
        query.status = status;
        saveState(state);
      }
    },
    rerunQuery: (state, action) => {
      const query = state.queries.find(q => q.timestamp === action.payload);
      if (query) {
        query.status = 'pending';
        saveState(state);
      }
    }
  }
});

export const { addQuery, removeQuery, clearHistory, updateQueryStatus, rerunQuery } = historySlice.actions;

export default historySlice.reducer; 