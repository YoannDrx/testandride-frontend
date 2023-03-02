import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token:null, firstName:'John',lastName:'Doe',picturePath:'../assets/demoAvatar.png',telephone: "0606060606",email:"test@testandride.fr", position:{latitude :"", longitude:""}},
};

export const userSlice = createSlice({
 name: 'user',
  initialState,
 reducers: {
   loginStore: (state, action) => {
     state.value = action.payload;
   },
   storePosition: (state, action) => {
     state.value.position = action.payload;
   },
 },
});

export const { loginStore, storePosition } = userSlice.actions;
export default userSlice.reducer;