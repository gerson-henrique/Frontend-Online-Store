import React, { Component } from 'react';
import { getProductsDetails } from '../services/api';

export default class CarrinhoDeCompras extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      quantity: 1,
    };
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount() {
    this.addCart();
  }

  getFromStorage() {
    const product = localStorage.getItem('cartList');
    return product ? product.split(',') : [];
  }

  addCart() {
    const products = this.getFromStorage();
    products.forEach((product) => {
      getProductsDetails(product).then((request) => {
        this.setState((ant) => ({
          list: [...ant.list, request],
        }));
      });
    });
  }

  render() {
    const { list, quantity } = this.state;
    return (
      (list.length >= 1) ? list.map((product) => (
        <div key={ product.id }>
          <h3 data-testid="shopping-cart-product-name">
            { product.title }
          </h3>
          <img src={ product.thumbnail } alt={ product.title } />
          <p data-testid="shopping-cart-product-quantity">
            { quantity }
          </p>
          <p>
            { product.price }
          </p>

        </div>
      )) : <p data-testid="shopping-cart-empty-message"> Seu carrinho está vazio</p>
    );
  }
}
