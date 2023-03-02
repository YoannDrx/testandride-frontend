import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token:null, firstName:'John',lastName:'Doe',picturePath:'../assets/demoAvatar.png'},
 
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