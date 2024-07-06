import React from 'react'
import { profile,logout } from '../store/authSlice'
import authService from '../appwrite/auth';


import {useDispatch,useSelector} from 'react-redux'

function Profile() {
   const user=useSelector((state)=>state.auth.user);
   console.log("Profile",user)
   localStorage.setItem('user',JSON.stringify(user));
   const dispatch=useDispatch();
   const hanldeLogout=async()=>{
    try{
      await authService.logout();
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    catch(error){
      console.log(error.message);
    }
      
   }
  return (
    <>
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profile</h2>
        <div className="profile-detail">
          <p><strong>Hi:{user.user.name} </strong></p>
        </div>
        <button onClick={hanldeLogout} className="logout-button">Logout</button>
      </div>
    </div>

    </>
    
  )
}

export default Profile
