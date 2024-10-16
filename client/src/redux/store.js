import { configureStore } from '@reduxjs/toolkit';
import speakerReducer from '../redux/slices/speakerSlice';  
import attendeeReducer from '../redux/slices/attendeeSlice';  
import { eventSlice } from './slices/eventSlice';

export const store = configureStore({
  reducer: {
    speaker: speakerReducer,  
    attendee:attendeeReducer,
    event:eventSlice
  },
});
