import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const assertionsMax = 3;
    return (
      <div>
        { score < assertionsMax
          ? (<span data-testid="feedback-text">Could be better...</span>)
          : (<span data-testid="feedback-text">Well Done!</span>) }
        <span data-testid="feedback-total-question">{ assertions }</span>
        <span data-testid="feedback-total-score">{ score }</span>
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
