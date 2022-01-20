import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as api from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = ({
      details: [],
    });
    this.getItemDetais = this.getItemDetais.bind(this);
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

  render() {
    const { details } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">
          {details.title}
        </h1>
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
