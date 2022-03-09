import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
