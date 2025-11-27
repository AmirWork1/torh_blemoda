import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Page404 from './pages/Page404';
import Header from './components/Header';


function App() {
  

  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
