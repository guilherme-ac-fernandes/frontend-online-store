import React from 'react';
import PropTypes from 'prop-types';

class FormItem extends React.Component {
  render() {
    const { handleChange, handleClick } = this.props;
    const array = ['one', 'two', 'three', 'four', 'five'];
    return (
      <form>
        <input
          type="email"
          name="email"
          data-testid="product-detail-email"
          onChange={ handleChange }
        />
        {array.map((_, index) => {
          const number = index + 1;
          return (
            <label key={ number } htmlFor={ `${number}-rating` }>
              {number }
              <input
                type="radio"
                data-testid={ `${number}-rating` }
                id={ `${number}-rating` }
                value={ number }
                name="stars"
                onChange={ handleChange }
              />
            </label>
          );
        })}
        <textarea
          data-testid="product-detail-evaluation"
          name="avaliation"
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ handleClick }
        >
          Adicionar ao carrinho
        </button>
      </form>
    );
  }
}

FormItem.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FormItem;
