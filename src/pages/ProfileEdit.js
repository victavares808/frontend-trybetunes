import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.saveButtonValidation());
  }

  clickButtonSave = async () => {
    const { history } = this.props;
    this.setState({ loadingMessage: true }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({ name, email, image, description });
      this.setState({ loadingMessage: false });
      history.push('/profile');
    });
  }

  saveButtonValidation = () => {
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
                onChange={ this.handleChange }
                name="name"
              />
              <input
                type="text"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
                name="email"
              />
              <input
                type="text"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
                name="description"
              />
              <input
                type="text"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
                name="image"
              />
              <input
                type="button"
                data-testid="edit-button-save"
                value="Salvar"
                onClick={ this.clickButtonSave }
                disabled={ saveButtonValidation }
              />
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
