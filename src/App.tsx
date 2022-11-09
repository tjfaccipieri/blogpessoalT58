import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './paginas/home/Home';
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer';
import Login from './paginas/login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from './paginas/cadastro/Cadastro';
import ListaTemas from './components/tema/listaTemas/ListaTemas';
import ListaPostagem from './components/postagens/listaPostagens/ListaPostagem';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/posts" element={<ListaPostagem />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
