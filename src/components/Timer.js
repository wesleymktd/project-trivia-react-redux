import React, { Component } from 'react';

class Timer extends Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    const { seconds } = this.state;
    const ONE_SECOND = 1000;
    this.timerRegre = setInterval(() => {
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.timerRegre);
    }
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>{ seconds }</div>
    );
  }
}

export default Timer;
