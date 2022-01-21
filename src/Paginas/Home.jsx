import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Componentes/ProductCard';
import CategoryList from '../Componentes/CategoryList';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchResult: [],
      categoryID: '',
      cartList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }

handleCartClick = ({ target }) => {
  const cart = localStorage.getItem('cartList');
  this.setState((ant) => ({
    cartList: [...ant.cartList, ant],
  }));
  if (cart) {
    localStorage.setItem('cartList', [...cart.split(','), target.value]);
  } else {
    localStorage.setItem('cartList', [target.value]);
  }
}

handleChange({ target }) {
  const { name } = target;
  const value = target.type === 'checkbox' ? target.checked : target.value;

  this.setState({
    [name]: value,
  });
}

async searchQuery() {
  const { categoryID, inputValue } = this.state;
  const url = await getProductsFromCategoryAndQuery(categoryID, inputValue);
  this.setState({
    searchResult: url.results,
  });
}

render() {
  const {
    searchResult,
    inputValue,
  } = this.state;
  return (
    <div>
      <input
        name="inputValue"
        onChange={ this.handleChange }
        data-testid="query-input"
        type="text"
        value={ inputValue }
      />
      <button
        onClick={ this.searchQuery }
        data-testid="query-button"
        type="button"
      >
        Pesquisar
      </button>
      <h3
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h3>
      <CategoryList
        onClick={ ({ target }) => {
          this.setState({
            categoryID: target.value,
          }, this.searchQuery);
        } }
      />
      <main>
        <section className="card-product">
          {searchResult.map((product) => (
            <div key={ product.title }>
              <ProductCard
                key={ product.id }
                productName={ product.title }
                productImage={ product.thumbnail }
                productPrice={ product.price }
              />
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ this.handleCartClick }
                value={ product.id }
              >
                Adicionar ao Carrinho
              </button>
              <Link
                to={ `/item/${product.id}` }
                data-testid="product-detail-link"
              >
                mais
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
}
