import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const myMeetingsSlice = createSlice({
    name: "myMeetings",
    initialState,
    reducers: {
        importMeetingsStore: (state, action) => {
            const { adresse } = action.payload;
            state.value = [...state.value, adresse];
        },
    },
});

export const { loginStore, storePosition, importMeetingsStore } = myMeetingsSlice.actions;
export default myMeetingsSlice.reducer;
