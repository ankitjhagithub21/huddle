import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    speakers: null,
    loading: true
  }

  
export const speakerSlice = createSlice({
    name: 'speaker',
    initialState,
    reducers: {
        setSpeakers: (state, action) => {
            state.speakers = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        addSpeaker: (state, action) => {
            state.speakers.push(action.payload);
        },
        editSpeaker: (state, action) => {
            state.speakers = state.speakers.map(speaker =>
                speaker._id === action.payload._id ? action.payload : speaker
            );
        },
        deleteSpeaker: (state, action) => {
            state.speakers = state.speakers.filter(speaker => speaker._id !== action.payload);
        },
    },
});

export const { setSpeakers, setLoading, addSpeaker, editSpeaker, deleteSpeaker } = speakerSlice.actions;

export default speakerSlice.reducer;
