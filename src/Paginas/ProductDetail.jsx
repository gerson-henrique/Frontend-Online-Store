import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as api from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = ({
      details: [],
      cartList: [],
    });
    this.getItemDetais = this.getItemDetais.bind(this);
    this.addCartItem = this.addCartItem.bind(this);
  }

  componentDidMount() {
    this.getItemDetais();
  }

  async getItemDetais() {
    const { match: { params: { id } } } = this.props;
    const apiItens = await api.getProductsDetails(id);
    this.setState({
      details: apiItens,
    });
  }

  addCartItem({ target }) {
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

  render() {
    const { details } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">
          {details.title}
        </h1>
        <button
          type="button"
          value={ details.id }
          data-testid="product-detail-add-to-cart"
          onClick={ this.addCartItem }
        >
          Add
        </button>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProductDetail.defaultProps = {
  match: {
    params: {
      id: '' } },
};
