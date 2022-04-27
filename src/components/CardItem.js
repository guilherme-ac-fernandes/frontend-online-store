import React from 'react';
import PropTypes from 'prop-types';

class CardItem extends React.Component {
  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <div data-testid="product">
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{price}</p>
      </div>
    );
  }
}

CardItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CardItem;
