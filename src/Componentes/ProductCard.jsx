import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
    } = this.props;
    return (
      <div data-testid="product">
        <h2>{ productName }</h2>
        <img
          src={ productImage }
          alt={ productName }
        />
        <p>
          `R$
          { productPrice }
          `
        </p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
};
