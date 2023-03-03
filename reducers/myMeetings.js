import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const myMeetingsSlice = createSlice({
 name: 'myMeetings',
  initialState,
 reducers: {
   importMeetingsStore: (state, action) => {
     state.value = [action.payload];
   }
 },
});

export const { loginStore, storePosition } = myMeetingsSlice.actions;
export default myMeetingsSlice.reducer;