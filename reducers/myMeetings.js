import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

export const myMeetingsSlice = createSlice({
    name: "myMeetings",
    initialState,
    reducers: {
        importMeetingsStore: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { importMeetingsStore } = myMeetingsSlice.actions;
export default myMeetingsSlice.reducer;
