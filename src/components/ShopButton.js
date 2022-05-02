import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShopButton.css';
import PropTypes from 'prop-types';

class ShopButton extends Component {
  render() {
    const { itensAmount } = this.props;

    return (
      <div className="shop-button-container">
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
          className="shop-button"
        >
          Carrinho
        </Link>
        <span data-testid="shopping-cart-size">{itensAmount}</span>
      </div>
    );
  }
}

ShopButton.propTypes = {
  itensAmount: PropTypes.number.isRequired,
};

export default ShopButton;
