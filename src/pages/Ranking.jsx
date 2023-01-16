import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  state = {
    doRedirectLogin: false,
  };

  setGoHome = () => {
    this.setState({
      doRedirectLogin: true,
    });
  };

  render() {
    const { doRedirectLogin } = this.state;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking Geral</h3>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.setGoHome }
        >
          Play Again
        </button>
        { doRedirectLogin && <Redirect to="/" /> }
      </div>
    );
  }
}

export default Ranking;
