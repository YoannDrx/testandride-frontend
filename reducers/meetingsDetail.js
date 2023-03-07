import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const meetingDetailsSlice = createSlice({
    name: "meetingDetails",
    initialState,
    reducers:{
        meetingDetailsStore: (state, action) => {
            state.value = [action.payload];
        }
    },
});

export const {meetingDetailsStore} = meetingDetailsSlice.actions;
export default meetingDetailsSlice.reducer;