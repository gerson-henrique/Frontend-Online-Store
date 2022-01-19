import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Paginas/Home';
import CarrinhoDeCompras from './Paginas/CarrinhoDeCompras';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Link data-testid="shopping-cart-button" to="/carrinho"> Carrinho </Link>
        <Route exact path="/" component={ Home } />
        <Route path="/carrinho" component={ CarrinhoDeCompras } />
      </BrowserRouter>
    );
  }
}

export default App;
