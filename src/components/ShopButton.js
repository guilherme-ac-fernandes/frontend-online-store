import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShopButton.css';
import PropTypes from 'prop-types';

class ShopButton extends Component {
  render() {
    const { favorites } = this.props;
    return (
      <div className="shop-button-container">
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
          className="shop-button"
        >
          Carrinho
        </Link>
        <span data-testid="shopping-cart-size">{favorites.length}</span>
      </div>
    );
  }
}

ShopButton.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default ShopButton;
