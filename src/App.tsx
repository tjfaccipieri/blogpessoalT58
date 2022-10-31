import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './paginas/home/Home';
import Navbar from './components/estaticos/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
          <Home />
        
    </div>
  );
}

export default App;
