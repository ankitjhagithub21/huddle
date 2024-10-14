import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    attendees: null,
    loading: false
  }


export const attendeeSlice = createSlice({
    name: 'attendee',
    initialState,
    reducers: {
        setAttendees: (state, action) => {
            state.attendees = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addAttendee: (state, action) => {
            state.attendees.push(action.payload);
        },
        editAttendee: (state, action) => {
            state.attendees = state.attendees.map(attendee =>
                attendee._id === action.payload._id ? action.payload : attendee
            );
        },
        deleteAttendee: (state, action) => {
            state.attendees = state.attendees.filter(attendee => attendee._id !== action.payload);
        },
    },
});

export const { setAttendees, setLoading, addAttendee, editAttendee, deleteAttendee } = attendeeSlice.actions;

export default attendeeSlice.reducer;
