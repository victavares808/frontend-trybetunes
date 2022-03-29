import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loadingMessage: false,
    };
  }

  async componentDidMount() {
    this.setState({ loadingMessage: true }, async () => {
      const { name, email, image, description } = await getUser();
      this.setState({
        name, email, description, image, loadingMessage: false,
      });
    });
  }

  render() {
    const { name, email, description, image, loadingMessage } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loadingMessage ? <Loading />
          : (
            <div>
              <img data-testid="profile-image" alt="profile_image" src={ image } />
              <p>
                { name }
              </p>
              <p>
                { description }
              </p>
              <p>
                { email }
              </p>
              <Link to="/profile/edit"> Editar perfil </Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
