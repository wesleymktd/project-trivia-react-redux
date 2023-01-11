import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateBtn);
  };

  validateBtn = () => {
    const { gravatarEmail, name } = this.state;

    const validEmail = gravatarEmail.toLocaleLowerCase()
      .match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const minNameLength = 0;
    const validName = name.length > minNameLength;
    this.setState({ buttonDisabled: !(validEmail && validName) });
  };

  render() {
    const { name, gravatarEmail, buttonDisabled } = this.state;
    return (
      <form>
        <h1>Login</h1>
        <fieldset>
          <label htmlFor="player-name">
            Nome de Usuário
            <input
              type="text"
              name="name"
              value={ name }
              id="player-name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="gravatarEmail"
              value={ gravatarEmail }
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ buttonDisabled }
            // onClick={ this.handleChange }
          >
            Play
          </button>

        </fieldset>
      </form>
    );
  }
}
export default Login;
