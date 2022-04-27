import React from 'react';
import PropTypes from 'prop-types';
import ShopButton from '../components/ShopButton';

class PageItem extends React.Component {
  render() {
    const { match: { params: { id } }, productList } = this.props;
    const result = productList.find((elemento) => elemento.id === id);
    const { title, thumbnail, price, attributes } = result;
    return (
      <div>
        <ShopButton />
        <div>
          <h2 data-testid="product-detail-name">{title}</h2>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
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
  productList: PropTypes.instanceOf(Array).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default PageItem;
