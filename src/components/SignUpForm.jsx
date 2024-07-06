import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {clearError, login, setError} from '../store/authSlice';
import authService from '../appwrite/auth'
import './SignUpForm.css';
import {useNavigate,Link} from 'react-router-dom';

function SignUpForm() {
  const[userName,setUserName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
   const dispatch=useDispatch();
   const error=useSelector((state)=>(state.auth.error));
   useEffect(()=>{
    dispatch(clearError());
   },[dispatch])

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      console.log("Email in sign up form",email);
      const user=await authService.signUpUser(email , password , userName);
      if(user){
        setError("");
        const user=await authService.getCurrentAccount();
       // const userdata=await authService.get();
        dispatch(login({user}));
        navigate('/profile')
      }
     
      
    }
    catch(error){
        dispatch(setError(error.message));
    }
    
  }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              onChange={(e)=>setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {error?<p className="error">{error}</p>:null}
        <p className="signup-link">
          Already have an account? <Link to="/loginform" onClick={()=>dispatch(clearError)}>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpForm
