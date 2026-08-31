import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css'
import Home from './pages/Home';
import About from './pages/About';
import Page404 from './pages/Page404';
import Header from './components/Header';
import UploadFile from './pages/UploadFile';
import Footer from './components/Footer';

function App() {
  

  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/UploadFile" element={<UploadFile />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      {/* footer */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
