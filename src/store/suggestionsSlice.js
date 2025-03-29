import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suggestions: [],
  loading: false,
  error: null
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.error = null;
    }
  }
});

export const { setSuggestions, setLoading, setError, clearSuggestions } = suggestionsSlice.actions;

export default suggestionsSlice.reducer; 