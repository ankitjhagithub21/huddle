import { configureStore } from '@reduxjs/toolkit';
import speakerReducer from '../redux/slices/speakerSlice';  

export const store = configureStore({
  reducer: {
    speaker: speakerReducer,  
  },
});
