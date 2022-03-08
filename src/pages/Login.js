import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      disabledButton: true,
      loading: false,
      redirect: false,
    };
  }

  // função enterButtonValidation para validação do botão //

    enterButtonValidation = () => {
      const { login } = this.state;
      const minUsernameLength = 3;
      const userValidation = login.length >= minUsernameLength;
      if (userValidation) {
        this.setState({ disabledButton: false });
      } else { this.setState({ disabledButton: true }); }
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      }, this.enterButtonValidation);
    }

    handleClick = () => {
      const { login } = this.state;
      this.setState({
        loading: true,
      },
      async () => {
        await createUser({ name: login });
        this.setState({
          loading: false,
          redirect: true,
          /* set state recupera e modifica estados iniciais, sendo possivel alterar quantos estados iniciais forem necessários */
        });
      });
    }

    /* async loadingScreen() {
      const { loading } = this.state;
      this.setState(
        { loading: true },
      );
      return loading;
    }  */

    render() {
      const { disabledButton, loading, redirect } = this.state;
      return (
        <div data-testid="page-login">
          <h3>Login</h3>
          <form>
            <label htmlFor="login-name">
              <div>
                {
                  loading
                    ? <Loading />
                    : (
                      <>
                        <input
                          className="yourNameHere"
                          type="text"
                          name="login"
                          data-testid="login-name-input"
                          onChange={ this.handleChange }
                        />
                        <button
                          data-testid="login-submit-button"
                          type="button"
                          disabled={ disabledButton }
                          onClick={ this.handleClick }
                        >
                          Entrar
                        </button>
                      </>
                    )
                }
                {redirect && <Redirect to="/search" />}
              </div>
              const
              { loading }
              = this.state;
            </label>
          </form>
        </div>
      );
    }
}

export default Login;
