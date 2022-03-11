import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      responseCheck: '',
    };
  }

  async componentDidMount() {
    getUser()
      .then((response) => this.setState({ responseCheck: response.name, loading: true }));
  }

  render() {
    const { loading, responseCheck } = this.state;
    return (
      <>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        <header data-testid="header-component">TrybeTunes</header>
        { !loading ? <Loading />
          : (
            <p data-testid="header-user-name">
              { responseCheck }
            </p>) }
      </>
    );
  }
}

export default Header;
