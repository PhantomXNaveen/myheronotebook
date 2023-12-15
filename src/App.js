import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
   //For dark mode
   const [mode, setMode] = useState('light');
   const toggleMode = ()=>{
     if(mode === 'light'){
       setMode('dark');
       document.body.style.backgroundColor = '#0a355c';
       document.body.style.color = 'white';
       toast.success("Dark Mode Enabled")
     }
     else{
       setMode('light');
       document.body.style.backgroundColor = 'white';
       document.body.style.color = 'black';
       toast.success("Light Mode Enabled")
     }
   }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar title="MyHeroNotebook" mode={mode} toggleMode={toggleMode}  />
        <Toaster/>
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path="/about" element={ <About />} /> 
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
