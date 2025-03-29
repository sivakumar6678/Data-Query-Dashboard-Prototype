import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSQLQueryFromGemini } from '../services/geminiService';
import { runDatabaseQuery } from '../services/LocalDataProcessor';

// Load query mode from Local Storage
const loadQueryMode = () => {
  return localStorage.getItem("queryMode") || "local"; // Default to local mode
};

// Async thunk for processing queries
export const processQuery = createAsyncThunk(
  'query/processQuery',
  async ({ query, mode }, { rejectWithValue }) => {
    try {
      if (!query || typeof query !== 'string' || !query.trim()) {
        throw new Error('Please enter a valid query');
      }

      if (mode === 'ai') {
        const sqlQuery = await getSQLQueryFromGemini(query);
        return sqlQuery;
      } else {
        const result = await runDatabaseQuery(query);
        return result;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  mode: 'local',
  query: '',
  loading: false,
  error: null,
  result: null
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
      state.error = null;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearResult: (state) => {
      state.result = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to process query';
        state.result = null;
      });
  }
});

export const { setMode, setQuery, clearError, clearResult } = querySlice.actions;
export default querySlice.reducer;
