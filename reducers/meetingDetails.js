import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:   {}
};

export const meetingDetailsSlice = createSlice({
    name: "meetingDetails",
    initialState,
    reducers: {
        importMeetingDetailsStore: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { importMeetingDetailsStore } = meetingDetailsSlice.actions;
export default meetingDetailsSlice.reducer;
