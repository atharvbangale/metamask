import React, { useState } from 'react'
import './App.css';
import "rabbitcss";
import Home from './pages/Home';
import Connect from './pages/Connect';
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Register from './components/Register';
import Metaverse from './pages/Metaverse';




const App = () => {

  const [state ,setState] = useState({
    account:null,
    contract : null
  })

  const saveState = (state) => {
    setState(state);
  }

  



  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/connect" element={<Connect saveState={saveState}/>}/>
      <Route path="/register" element={<Register state={state}/>}/>
      <Route path="/dashboard" element={<Dashboard state={state} saveState={saveState}/> }/>
      <Route path="/metaverse" element={<Metaverse state={state} saveState={saveState}/> }/>

  </Routes>

    </Router>
  )
}

export default App
