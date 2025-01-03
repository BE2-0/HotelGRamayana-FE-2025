import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Dining from './Pages/Dining';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dining" element={<Dining />} />
      </Routes>
    </>
  )
}

export default App
