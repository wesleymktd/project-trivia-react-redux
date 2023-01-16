import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimeUpdate } from '../redux/actions';

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    const { seconds } = this.state;
    const { func } = this.props;
    const ONE_SECOND = 1000;
    this.timerRegre = setInterval(() => {
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
        func();
      }
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { dispatch } = this.props;
    if (seconds === 0) {
      clearInterval(this.timerRegre);
      dispatch(setTimeUpdate(seconds));
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>{ seconds }</div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
