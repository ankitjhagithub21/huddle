import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    venues: null,
    loading: false
  }


export const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        setVenues: (state, action) => {
            state.venues = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addVenue: (state, action) => {
            state.venues.push(action.payload);
        },
        editVenue: (state, action) => {
            state.venues = state.venues.map(venue =>
                venue._id === action.payload._id ? action.payload : venue
            );
        },
        deleteVenue: (state, action) => {
            state.venues = state.venues.filter(venue => venue._id !== action.payload);
        },
    },
});

export const { setVenues, setLoading, addVenue, editVenue, deleteVenue } = venueSlice.actions;

export default venueSlice.reducer;
