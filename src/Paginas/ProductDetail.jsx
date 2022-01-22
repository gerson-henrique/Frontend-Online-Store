import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as api from '../services/api';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = ({
      details: [],
      cartList: [],
      coments: [],
      avaliation: '',
      user: '',
      emails: [],
    });
    this.getItemDetais = this.getItemDetais.bind(this);
    this.addCartItem = this.addCartItem.bind(this);
    this.getFromStorage = this.getFromStorage.bind(this);
  }

  componentDidMount() {
    this.getItemDetais();
    this.getFromStorage();
  }

  handleClick = () => {
    const { avaliation, user } = this.state;
    const validLoad = localStorage.getItem('coments');
    this.setState((ant) => ({
      coments: [...ant.coments, avaliation],
      emails: [...ant.emails, user],
    }));
    if (validLoad) {
      localStorage.setItem('coments', [...validLoad.split(','), avaliation]);
      localStorage.setItem('emails', [...validLoad.split(','), user]);
    } else {
      localStorage.setItem('coments', [avaliation]);
      localStorage.setItem('emails', [user]);
    }
  }

  async getItemDetais() {
    const { match: { params: { id } } } = this.props;
    const apiItens = await api.getProductsDetails(id);
    this.setState({ details: apiItens });
  }

  getFromStorage() {
    const reviewComent = localStorage.getItem('coments');
    const a = reviewComent ? reviewComent.split(',') : [];
    const reviewUser = localStorage.getItem('emails');
    const b = reviewUser ? reviewUser.split(',') : [];
    this.setState({
      coments: a,

      emails: b,
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
    const { details, coments, emails } = this.state;
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

        <form>
          <input
            data-testid="product-detail-email"
            type="text"
            placeholder="email"
            onChange={ ({ target }) => {
              this.setState({ user: target.value });
            } }
          />
          <textarea
            placeholder="Mensagem"
            data-testid="product-detail-evaluation"
            onChange={ ({ target }) => {
              this.setState({ avaliation: target.value });
            } }
          />
          <input type="radio" name="rak" id="1" data-testid="1-rating" />
          <input type="radio" name="rak" id="2" data-testid="2-rating" />
          <input type="radio" name="rak" id="3" data-testid="3-rating" />
          <input type="radio" name="rak" id="4" data-testid="4-rating" />
          <input type="radio" name="rak" id="5" data-testid="5-rating" />

          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Avaliar
          </button>
        </form>
        <div>
          {coments.length > 0 && coments.map((e, id) => (
            <div key={ id }>
              <h3>
                { emails[id] }
              </h3>
              <li key={ id }>{e}</li>
            </div>
          ))}
        </div>
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
