import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestQuestionApi from '../redux/services/requestQuestions';
import Header from '../components/Header';
import Questions from '../components/Questions';
import { questionAct, setTimeUpdate } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
    condicionalKey: false,
    seconds: 30,
  };

  componentDidMount() {
    this.funcVerifyToken();
    this.funcCreateTimer();
  }

  funcVerifyToken = async () => {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    const responseApi = await requestQuestionApi(token);
    const invalidResponseCode = 3;
    if (responseApi.response_code === invalidResponseCode) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: [...responseApi.results],
      });
      dispatch(questionAct(responseApi));
    }
  };

  funcCreateTimer = () => {
    const { dispatch } = this.props;
    const ONE_SECOND = 1000;
    this.timerRegre = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }), () => {
          const { seconds: second } = this.state;
          dispatch(setTimeUpdate(second));
        });
      } else {
        this.funcClearTimer();
      }
    }, ONE_SECOND);
  };

  funcClearTimer = () => {
    const { dispatch } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      this.setState({ condicionalKey: true });
      clearInterval(this.timerRegre);
      dispatch(setTimeUpdate(seconds));
    }
  };

  render() {
    const { questions, indexQuestion, condicionalKey, seconds } = this.state;
    const question = questions[indexQuestion];
    return (
      <div>
        <Header />
        <div>{ seconds }</div>
        { questions.length === 0
          ? <p>Loading...</p>
          : (
            <Questions
              question={ question }
              func={ () => this.setState({ condicionalKey: true }) }
              condicionalKey={ condicionalKey }
              nextOnClick={ () => this.setState((prevState) => ({
                indexQuestion: prevState.indexQuestion + 1,
                condicionalKey: false,
                seconds: 30,
              })) }
            />)}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Game);
