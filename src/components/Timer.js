import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends Component {
  componentDidMount() {

  }

  render() {
    const { seconds } = this.props;
    return (
      <div>{ seconds }</div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default connect()(Timer);
