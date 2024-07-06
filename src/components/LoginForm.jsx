import React, { useState,useEffect } from 'react'
import './LoginForm.css'
import { login,setError,clearError } from '../store/authSlice';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { useNavigate,Link } from "react-router-dom";


function LoginForm() {
  const dispatch=useDispatch();
  const error=useSelector((state)=>(state.auth.error));
 const[email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const navigate =useNavigate();
 useEffect(()=>{
  dispatch(clearError());
 },[dispatch])
   const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      const user=await authService.login(email,password);
      console.log(user);
      if(user){
        const userData = await authService.getCurrentAccount();
        localStorage.setItem('user',JSON.stringify(userData));
        localStorage.setItem('token',user.$id);
        console.log(user);
        dispatch(login({user}));
        navigate('/profile');
      }
    } catch(error){
      dispatch(setError(error.message))
    }
    
    

   }

  return (
<div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="input-group">
            <label htmlFor="user">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      {error?<p className="error">{error}</p>:null}
      <p className="signup-link">
          Don't have an account? <Link to="/signupform" onClick={()=>dispatch(clearError)}>Sign up</Link>
        </p>
    </div>
    
  )
}

export default LoginForm
