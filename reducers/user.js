import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token:null, firstName:'Invited',lastName:'User',picturePath:require('../assets/demoAvatar.png')},
};

export const userSlice = createSlice({
 name: 'user',
  initialState,
 reducers: {
   loginStore: (state, action) => {
     state.value = action.payload;
   },
 },
});

export const { loginStore } = userSlice.actions;
export default userSlice.reducer;