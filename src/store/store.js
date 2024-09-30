import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '../store/slices/studentSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer, 
  },
});

export default store;

