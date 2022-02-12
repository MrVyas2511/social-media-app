import React from 'react'
import {  BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import { Container } from 'semantic-ui-react';

import './App.css';

import MenuBar from './components/Menubar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Router>
    <div className='ui container'>
    <MenuBar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/> 
        <Route exact path='/login' element={<Login/>}/> 
        <Route exact path='/register' element={<Register/>}/> 
   
      </Routes>
      </div> 
    </Router>
  );
}

export default App;
