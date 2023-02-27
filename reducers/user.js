import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token:null},
};

export const userSlice = createSlice({
 name: 'user',
  initialState,
 reducers: {
   loginStore: (state, action) => {
     state.value.token = action.payload;
   },
 },
});

export const { loginStore } = userSlice.actions;
export default userSlice.reducer;