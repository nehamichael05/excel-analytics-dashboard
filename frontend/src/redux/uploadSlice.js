import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uploads: [],
  loading: false,
  error: null,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploads(state, action) {
      state.uploads = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUploads, setLoading, setError } = uploadSlice.actions;
export default uploadSlice.reducer;
