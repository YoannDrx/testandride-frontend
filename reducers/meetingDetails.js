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
        updateCourseStatutStore:(state,action)=> {
            state.value.infos.fields.Statut = action.payload;
        }
    },
});

export const { importMeetingDetailsStore,updateCourseStatutStore} = meetingDetailsSlice.actions;
export default meetingDetailsSlice.reducer;
