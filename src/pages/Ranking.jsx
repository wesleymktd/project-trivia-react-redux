import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  state = {
    doRedirectLogin: false,
    ranking: [],
  };

  componentDidMount() {
    this.funcRanking();
  }

  setGoHome = () => {
    this.setState({
      doRedirectLogin: true,
    });
  };

  funcRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking')) ?? [];
    ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking,
    });
  };

  render() {
    const { doRedirectLogin, ranking } = this.state;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking Geral</h3>
        <ul>
          {ranking.map(({ name, score, picture }, index) => (
            <li
              key={ `${name}${index}` }
            >
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
              <img src={ picture } alt={ name } />

            </li>

          ))}
        </ul>
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
