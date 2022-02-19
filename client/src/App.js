import React from 'react'
import {  BrowserRouter as Router,Routes, Route } from "react-router-dom";

import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/authRoute';

import MenuBar from './components/Menubar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile'

function App() {
  return (
    <AuthProvider>
    <Router className="wrapper">
    <div className='ui container'>
    <MenuBar/>
      <Routes>
            <Route exact path='/' element={<Home />} /> 
            <Route exact path = '/login' element={<AuthRoute/>}>
              <Route exact path='/login' element={<Login />} /> 
            </Route>
            <Route exact path = '/register' element={<AuthRoute/>}>
              <Route exact path='/register' element={<Register/>}/> 
            </Route>
            <Route exact path='/posts/:postId' element={<SinglePost />} />
            
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='profile/:userId' element={ <UserProfile/>}/>
=
      </Routes>
      </div> 
      </Router>
      </AuthProvider>
  );
}

export default App;
