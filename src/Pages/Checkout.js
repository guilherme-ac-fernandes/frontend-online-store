import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  render() {
    const { favorites } = this.props;
    const favoritesFilter = favorites
      .filter((element, index) => favorites.indexOf(element) === index);
    return (
      <div>
        {favoritesFilter.map((item) => (
          <div key={ item.id }>
            <p>{item.title}</p>
            <img src={ item.thumbnail } alt={ item.title } width="120px" />
            <p>{`R$ ${item.price}`}</p>
          </div>
        ))}
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
            name="full-name"
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
            name="cpf"
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
            name="cep"
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
            name="phone"
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            name="adress"
          />
          <fieldset>
            <legend>Método de Pagamento:</legend>
            <label htmlFor="boleto">
              Boleto
              <input type="radio" name="payment" value="boleto" id="boleto" />
            </label>
            <label htmlFor="card">
              Cartão
              <input type="radio" name="payment" value="card" id="card" />
            </label>
          </fieldset>
          <button type="button">Finalizar Compra</button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default Checkout;
