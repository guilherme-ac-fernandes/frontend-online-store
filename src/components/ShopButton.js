import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ShopButton.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShopButton extends Component {
  render() {
    return (
      <div className="shop-button-container">
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
          className="shop-button"
        >
          Carrinho
        </Link>
        {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
      </div>
    );
  }
}

export default ShopButton;
