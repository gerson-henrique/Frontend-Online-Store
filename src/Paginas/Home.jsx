import React, { Component } from 'react';
import CategoryList from '../Componentes/CategoryList';

export default class Home extends Component {
  render() {
    return (
      <div>
        <CategoryList />
        <input type="text" />
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
      </div>
    );
  }
}
