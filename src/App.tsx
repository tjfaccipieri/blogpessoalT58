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
import CadastroTema from './components/tema/cadastroTema/CadastroTema';
import DeletarTema from './components/tema/deletarTema/DeletarTema';
import CadastroPostagem from './components/postagens/cadastroPostageem/CadastroPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import { Provider } from 'react-redux';
import store from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
      <Navbar />
      <div style={{minHeight: '74.2vh'}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/temas" element={<ListaTemas />} />
          <Route path="/posts" element={<ListaPostagem />} />
          <Route path='cadastroTema' element={<CadastroTema />} />
          <Route path='editarTema/:id' element={<CadastroTema />} />
          <Route path='apagarTema/:id' element={<DeletarTema />} />
          <Route path='cadastroPost' element={<CadastroPostagem />} />
          <Route path='editarPostagem/:id' element={<CadastroPostagem />} />
          <Route path='deletarPostagem/:id' element={<DeletarPostagem />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
