import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Dining from './Pages/Dining';
import Gallery from './Pages/Gallery';
import Booking from './Pages/Booking';
import About from './Pages/About';
import Blog from './Pages/Blog';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </>
  )
}

export default App
