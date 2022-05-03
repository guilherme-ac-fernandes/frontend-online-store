import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      email: '',
      cpf: '',
      cep: '',
      phone: '',
      adress: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    this.setState({
      fullname: '',
      email: '',
      cpf: '',
      cep: '',
      phone: '',
      adress: '',
    });
  }

  render() {
    const { favorites } = this.props;
    const {
      fullname,
      email,
      cpf,
      cep,
      phone,
      adress,
    } = this.state;
    const favoritesFilter = favorites.reduce((acc, curr) => {
      if (!acc.some((item) => item.id === curr.id)) acc.push(curr);
      return acc;
    }, []);
    const total = favorites.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    return (
      <div>
        {favoritesFilter.map((item) => (
          <div key={ item.id }>
            <p>{item.title}</p>
            <img src={ item.thumbnail } alt={ item.title } width="120px" />
            <p>{`R$ ${item.price.toFixed(2)}`}</p>
          </div>
        ))}
        <h3>{`Valor total da compra : R$${total.toFixed(2)}`}</h3>
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome Completo"
            name="fullname"
            value={ fullname }
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
            name="cpf"
            value={ cpf }
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
            name="cep"
            value={ cep }
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
            name="phone"
            value={ phone }
            onChange={ this.handleChange }
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
            name="adress"
            value={ adress }
            onChange={ this.handleChange }
          />
          <fieldset>
            <legend>Método de Pagamento:</legend>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                name="payment"
                value="boleto"
                id="boleto"
              />
            </label>
            <label htmlFor="card">
              Cartão
              <input type="radio" name="payment" value="card" id="card" />
            </label>
          </fieldset>
          <button type="button" onClick={ this.handleClick }>Finalizar Compra</button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  favorites: PropTypes.instanceOf(Array).isRequired,
};

export default Checkout;
