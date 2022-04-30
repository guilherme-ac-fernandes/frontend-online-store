import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ShopButton extends Component {
  render() {
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
        {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
      </div>
    );
  }
}

export default ShopButton;
