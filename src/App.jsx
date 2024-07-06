import React, { useEffect } from "react"
import LoginForm from './components/LoginForm'
import SignUpForm from "./components/SignUpForm"
import Profile from "./components/Profile";
import auth from "./appwrite/auth"; 
import { login,setError,setStatus,clearError, logout,setToken,setUser } from './store/authSlice';
import{BrowserRouter as Router, Route ,Routes ,Navigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

function App() {
  const isAuth=useSelector((state)=>(state.auth.status));
  const dispatch=useDispatch();
  const token=useSelector((state)=>state.auth.token); 
     useEffect(()=>{
      const token=localStorage.getItem('token');
      const user =JSON.parse(localStorage.getItem('user'));
      if(token&&user){
        dispatch(setToken(token));
        dispatch(setUser(user));
        dispatch(setStatus(true));
        
          }
     },[dispatch])

      return (
        <Router>
            <Routes>
              <Route 
              path="/loginform"
              element={token||isAuth?
                <Navigate
                   to="/profile"                
                />:
                <LoginForm/>
              }
              />
               <Route 
              path="/signupform"
              element={token||isAuth?
                <Navigate
                   to="/profile"                
                />:
                <SignUpForm/>
              }
              />
               <Route 
              path="/profile"
              element={token||isAuth?
                <Profile/>
                :
                <Navigate to="/loginform"/>
              } />
              <Route
              path="/"
              element={token?
                <Navigate
                to="/profile"
                />:
                <LoginForm/>
                
              }
              />
            </Routes>
        </Router>
    
  )
}

export default App
