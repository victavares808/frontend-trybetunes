import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
      </div>
    );
  }
}

export default Favorites;
