import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  render() {
    const { favorites, shoppingBag, handleSizeMais, handleSizeMenos } = this.props;
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
                  {shoppingBag[`${element.id}`]}
                </p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleSizeMenos(element.id) }
                >
                  -
                </button>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => handleSizeMais(element.id) }
                >
                  +
                </button>
                <button
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
            >
              Finalizar COmpra
            </button>
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
  shoppingBag: PropTypes.instanceOf(Object).isRequired,
  handleSizeMais: PropTypes.func.isRequired,
  handleSizeMenos: PropTypes.func.isRequired,
};
export default ShoppingCart;
