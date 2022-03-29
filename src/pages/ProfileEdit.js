import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loadingMessage: false,
      saveButtonValidation: true,
    };
  }

  async componentDidMount() {
    this.setState({ loadingMessage: true }, async () => {
      const { name, email, image, description } = await getUser();
      this.setState({
        name,
        email,
        description,
        image,
        loadingMessage: false,
      }, () => {
        this.saveButtonValidation();
      });
    });
  }

  saveButtonValidation() {
    const { name, email, image, description } = this.state;
    const emailRegex = /\S+@\S+\.\S+/; // \S+ = qualquer Texto, . = caractere especial do Regex colocado atraves de um scape, \S+ = qualquer Texto,
    const ctrl = emailRegex.test(email);
    if (name !== '' && email !== '' && image !== '' && description !== '' && ctrl) {
      this.setState({
        saveButtonValidation: false,
      });
    }
  }

  render() {
    const { name,
      email,
      description,
      image,
      loadingMessage,
      saveButtonValidation,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loadingMessage ? <Loading />
          : (
            <div>
              <input
                type="text"
                data-testid="edit-input-name"
                value={ name }
              />
              <input
                type="text"
                data-testid="edit-input-email"
                value={ email }
              />
              <input
                type="text"
                data-testid="edit-input-description"
                value={ description }
              />
              <input
                type="text"
                data-testid="edit-input-image"
                value={ image }
              />
              <input
                type="button"
                data-testid="edit-button-save"
                value="Salvar"
                disabled={ saveButtonValidation }
              />
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
