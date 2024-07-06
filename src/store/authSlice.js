import {createSlice} from '@reduxjs/toolkit'
import { act } from 'react';

//get initial values

const token=localStorage.getItem('token');
const status=localStorage.getItem('status');
const user=JSON.parse(localStorage.getItem('user'));
const initialState={ //create inital state 
    user:user?user:null,
    token:token?token:null,
    status:status?true:false, 
    error:null,  
 }
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      setUser:(state,action)=>{
          state.user=action.payload;
          localStorage.setItem('user',JSON.stringify(action.payload));

      },
      login:(state,action)=>{
         state.status=true;
         state.user=action.payload;
         localStorage.setItem('status',true);
         localStorage.setItem('user',JSON.stringify(action.payload));
         console.log("login");         
      },
      logout:(state)=>{
          state.status=false;
          state.user=null;
          state.token=null;
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('status');
      },
      profile:(state,action)=>{
            state.status=true,
            state.user=action.payload.user
      },
     setStatus:(state)=>{
          state.status=true;
     },
      setToken:(state,action)=>{
        state.token=action.payload;
        localStorage.setItem('token',action.payload);
      },
      setError:(state,action)=>{
         state.error=action.payload;
      },
      clearError:(state,action)=>{
        state.error=null;
      }
      

    }

});

export const {login,setToken,setUser,setStatus,logout,profile,setError,clearError}=authSlice.actions;
export default authSlice.reducer;
