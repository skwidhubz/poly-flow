import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Create from './pages/Create';
import Canvas from './pages/Canvas';
import Library from './pages/Library';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Route, Routes } from "react-router-dom";


const App = () => {
  return (

    <>
    <Nav />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/create" element={<Create />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
    
  );
};



export default App;
