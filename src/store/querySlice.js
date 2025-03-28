import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { processQuery } from '../services/geminiService';

export const submitQuery = createAsyncThunk(
  'query/submitQuery',
  async (query, { rejectWithValue }) => {
    try {
      const response = await processQuery(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentQuery: '',
  loading: false,
  error: null,
  results: null,
  rateLimit: {
    remaining: 15,
    resetTime: null,
  },
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
      state.error = null;
    },
    clearResults: (state) => {
      state.results = null;
      state.error = null;
    },
    updateRateLimit: (state, action) => {
      state.rateLimit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        // Update rate limit
        if (state.rateLimit.remaining > 0) {
          state.rateLimit.remaining -= 1;
        }
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload.includes('Rate limit exceeded')) {
          state.rateLimit.remaining = 0;
          state.rateLimit.resetTime = Date.now() + 60000; // Reset after 1 minute
        }
      });
  },
});

export const { setCurrentQuery, clearResults, updateRateLimit } = querySlice.actions;
export default querySlice.reducer; 