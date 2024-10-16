import { configureStore } from '@reduxjs/toolkit';
import speakerReducer from '../redux/slices/speakerSlice';
import attendeeReducer from '../redux/slices/attendeeSlice';
import eventReducer from '../redux/slices/eventSlice';
import venueReducer from './slices/venueSlice';

export const store = configureStore({
  reducer: {
    speaker: speakerReducer,
    attendee: attendeeReducer,
    event: eventReducer,
    venue: venueReducer
  },
});
