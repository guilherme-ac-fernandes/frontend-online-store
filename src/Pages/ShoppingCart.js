import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ShoppingCart.css';

class ShoppingCart extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/checkout');
  }

  render() {
    const { favorites, shoppingBag, handleSizeMais, handleSizeMenos } = this.props;
    const favoritesFilter = favorites
      .filter((element, index) => favorites.indexOf(element) === index);
      // console.log(favoritesFilter)
    return (
      <main className="shopping-cart-main">
        {favorites.length > 0 ? (
          <div className="shopping-cart-container">
            {favoritesFilter.map((element, index) => (
              <div key={ index } className="shopping-cart-product">
                <button
                  type="button"
                >
                  X
                </button>
                <img src={ element.thumbnail } alt={ element.title } width="120px" />
                <p
                  data-testid="shopping-cart-product-name"
                  className="shopping-cart-product-name"
                >
                  {element.title}
                </p>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  onClick={ () => handleSizeMenos(element.id) }
                >
                  -
                </button>
                <p
                  data-testid="shopping-cart-product-quantity"
                  className="shopping-cart-product-quantity"
                >
                  {shoppingBag[`${element.id}`]}
                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  onClick={ () => handleSizeMais(element.id) }
                >
                  +
                </button>
                <p className="shopping-cart-product-price">{`R$: ${element.price}`}</p>
              </div>
            ))}
            <button
              type="button"
              className="shopping-cart-product-buy"
              data-testid="checkout-products"
              onClick={ this.handleClick }
            >
              Finalizar Compra
            </button>
          </div>
        ) : (
          <h2
            data-testid="shopping-cart-empty-message"
            className="shopping-cart-empty-message"
          >
            Seu carrinho está vazio
          </h2>
        )}
      </main>
    );
  }
}

ShoppingCart.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
  shoppingBag: PropTypes.instanceOf(Object).isRequired,
  handleSizeMais: PropTypes.func.isRequired,
  handleSizeMenos: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default ShoppingCart;
