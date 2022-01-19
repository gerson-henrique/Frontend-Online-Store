import React, { Component } from 'react';
import * as api from '../services/api';

export default class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
    this.setCategories = this.setCategories.bind(this);
  }

  componentDidMount() {
    this.setCategories();
  }

  async setCategories() {
    const apiCate = await api.getCategories();
    this.setState({
      categories: apiCate,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="categoryContainer">
        {
          categories.map((category) => (
            <label
              className="categoryItem"
              htmlFor={ category.name }
              key={ category.id }
              data-testid="category"
            >
              { category.name }
              <input
                type="radio"
                name={ category.name }
              />
            </label>))
        }
      </div>
    );
  }
}
