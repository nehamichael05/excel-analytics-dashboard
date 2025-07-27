import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import uploadReducer from './uploadSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    upload: uploadReducer,
  },
});
