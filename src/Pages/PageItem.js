import React from 'react';
import PropTypes from 'prop-types';
import ShopButton from '../components/ShopButton';

class PageItem extends React.Component {
  render() {
    const { match: { params: { id } }, productList, handleFavorites } = this.props;
    const result = productList.find((elemento) => elemento.id === id);
    const { title, thumbnail, price, attributes } = result;
    return (
      <div>
        <ShopButton />
        <div>
          <h2 data-testid="product-detail-name">{title}</h2>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
          <button
            type="button"
            onClick={ () => handleFavorites(result) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
          <ul>
            {
              attributes.map(({ name, value_name: value }, index) => (
                <li key={ index }>{`${name}: ${value}`}</li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

PageItem.propTypes = {
  handleFavorites: PropTypes.func.isRequired,
  productList: PropTypes.instanceOf(Array).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default PageItem;
