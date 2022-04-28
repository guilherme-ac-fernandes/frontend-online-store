import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardItem extends React.Component {
  render() {
    const {
      object: { thumbnail, title, price, id },
      handleFavorites,
      object } = this.props;

    return (
      <div data-testid="product">
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } width="120px" />
        <p>{price}</p>
        <Link
          to={ `/page-item/${id}` }
          data-testid="product-detail-link"
        >
          Mais detalhes

        </Link>
        <button
          type="button"
          onClick={ () => handleFavorites(object) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

CardItem.propTypes = {
  handleFavorites: PropTypes.func.isRequired,
  object: PropTypes.instanceOf(Object).isRequired,
};

export default CardItem;
