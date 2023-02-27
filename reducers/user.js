import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {avatar:null,token:null,coords:{lat:null,lon:null}},
};

export const userSlice = createSlice({
 name: 'user',
  initialState,
 reducers: {
   logInStore: (state, action) => {
     state.value.token = action.payload.token;
   },
   logOutStore: (state, action) => {
    state.value = {avatar:null,token:null,coords:{lat:null,lon:null}};
  },
 },
});

export const { logInStore,logOutStore } = userSlice.actions;
export default userSlice.reducer;
