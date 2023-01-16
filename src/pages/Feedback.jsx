import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    doRedirectLogin: false,
    doRedirectRanking: false,
  };

  setPlayAgain = () => {
    this.setState({
      doRedirectLogin: true,
    });
  };

  setViewRanking = () => {
    this.setState({
      doRedirectRanking: true,
    });
  };

  render() {
    const { assertions, score } = this.props;
    const { doRedirectLogin, doRedirectRanking } = this.state;
    const assertionsMax = 3;
    return (
      <div>
        <Header />
        { score < assertionsMax
          ? (<span data-testid="feedback-text">Could be better...</span>)
          : (<span data-testid="feedback-text">Well Done!</span>) }
        <span data-testid="feedback-total-question">{ assertions }</span>
        <span data-testid="feedback-total-score">{ score }</span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.setPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.setViewRanking }
        >
          Ranking
        </button>
        { doRedirectLogin && <Redirect to="/" /> }
        { doRedirectRanking && <Redirect to="/ranking" /> }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
