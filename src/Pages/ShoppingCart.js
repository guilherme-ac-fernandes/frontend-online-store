import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  render() {
    const { favorites } = this.props;

    const favoritesFilter = favorites
      .filter((element, index) => favorites.indexOf(element) === index);

    return (
      <div>

        {favorites.length > 0 ? (
          <div>
            {favoritesFilter.map((element, index) => (
              <div key={ index }>
                <p
                  data-testid="shopping-cart-product-name"
                >
                  {element.title}
                </p>
                <p
                  data-testid="shopping-cart-product-quantity"
                >
                  {favorites.filter((item) => item.id === element.id).length}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <h2
            data-testid="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h2>
        )}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
};
export default ShoppingCart;
