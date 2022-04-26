import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShopButton extends Component {
  render() {
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
      </div>
    );
  }
}

export default ShopButton;
