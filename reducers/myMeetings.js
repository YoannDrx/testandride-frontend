import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:   [],
};

export const myMeetingsSlice = createSlice({
    name: "myMeetings",
    initialState,
    reducers: {
        importMeetingsStore: (state, action) => {
            state.value.meeting = action.payload;
        },
    },
});

export const { importMeetingsStore } = myMeetingsSlice.actions;
export default myMeetingsSlice.reducer;
