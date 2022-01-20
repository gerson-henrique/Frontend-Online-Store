import React, { Component } from 'react';
import ProductCard from '../Componentes/ProductCard';
import CategoryList from '../Componentes/CategoryList';
import { getProductsFromCategoryAndQuery } from '../services/api';

// teste

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchResult: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  async searchQuery() {
    const { inputValue } = this.state;
    const url = await getProductsFromCategoryAndQuery(inputValue);
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
        <CategoryList />
        <main>
          <section className="card-product">
            {searchResult.map((product) => (
              <div key={ product.id }>
                <ProductCard
                  key={ product.id }
                  productName={ product.title }
                  productImage={ product.thumbnail }
                  productPrice={ product.price }
                />
                <link
                  to={ `/item/:${product.id}` }
                  data-testid="product-detail-link"
                >
                  mais
                </link>
              </div>
            ))}
          </section>
        </main>
      </div>
    );
  }
}
