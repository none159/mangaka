import { useState } from 'react'
import Home from './components/homepage'
import Trending from './components/trendingmang';
import Chatpage from './components/chatpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="./mangaka" element={<Home />} />
        <Route path="./trending" element={<Trending />} />
        <Route path="./groupchat" element={<Chatpage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
