import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      disabledButton: true,
      loading: false,
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
      createUser({ name: login });
      this.setState(
        { loading: true },
      );
    }

     /* async loadingScreen() {
      const { loading } = this.state;
      this.setState(
        { loading: true },
      );
      return loading;
    }  */

    render() {
      const { disabledButton, loading } = this.state;
      const loadingElement = <span>Loading...</span>;
      return (
        <div data-testid="page-login">
          <h3>Login</h3>
          <form>
            <label htmlFor="login-name">
              <div>
                  {
                    { 
                      loading  
                        ? loadingElement
                        : 
                        (<>
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
                        </>)
                  }
                  }
                  const { loading } = this.state;
      
              </div>
            </label>
          </form>
        </div>
      );
    }
}

export default Login;
