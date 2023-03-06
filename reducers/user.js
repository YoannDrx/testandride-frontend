import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token:null,tels:[{title:'',num:''}],email:'', firstName:'Invited',lastName:'User',picturePath:require('../assets/demoAvatar.png'), position:{latitude :"", longitude:""}},
};

export const userSlice = createSlice({
 name: 'user',
  initialState,
 reducers: {
   loginStore: (state, action) => {
    
     for ( const userProps in action.payload){
        state.value[userProps]= action.payload[userProps];
     }
   },
   logoutStore:(state,action)=>{
    state.value = initialState.value;
   },
   storePosition: (state, action) => {
     state.value.position = action.payload;
   },
   changePhoto: (state, action) => {
     state.value.photo = action.payload;
   }
 },
});

export const { loginStore, storePosition, changePhoto } = userSlice.actions;
export default userSlice.reducer;