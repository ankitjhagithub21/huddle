import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    events:null,
    loading: false
  }


export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setevents: (state, action) => {
            state.events = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
        editEvent: (state, action) => {
            state.events = state.events.map(event =>
                event._id === action.payload._id ? action.payload : event
            );
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter(event => event._id !== action.payload);
        },
    },
});

export const { setevents, setLoading, addEvent, editEvent, deleteEvent } = eventSlice.actions;

export default eventSlice.reducer;
