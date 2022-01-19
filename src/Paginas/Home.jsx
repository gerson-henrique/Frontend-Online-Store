import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CategoryList from '../Componentes/CategoryList';

export default class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <CategoryList />
        <input type="text" />
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </BrowserRouter>
    );
  }
}
