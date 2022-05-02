import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      info: [],
      loading: false,
    };
  }

  async componentDidMount() {
    await this.getProductFromAPI();
    this.isLoading();
  }

  isLoading = () => {
    this.setState({ loading: true });
  }

  getProductFromAPI = async () => {
    const { shoppingBag } = this.props;
    Object.keys(shoppingBag).forEach(async (item) => {
      const product = await api.getProductsFromId(item);
      this.setState((previous) => ({
        info: [...previous.info, product],
      }));
    });
  }

  render() {
    const { info, loading } = this.state;
    return (
      <div>
        {loading
          && info.map((item) => (
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
  shoppingBag: PropTypes.instanceOf(Object).isRequired,
};

export default Checkout;
