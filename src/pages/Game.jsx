import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/header';
import Questions from '../components/Questions';
import requestQuestionApi from '../redux/services/requestQuestions';
import { questionAct } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
  };

  async componentDidMount() {
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
  }

  render() {
    const { questions, indexQuestion } = this.state;
    const question = questions[indexQuestion];
    return (
      <div>
        <Header />
        <Timer />
        { questions.length === 0
          ? <p>Loading...</p>
          : <Questions question={ question } />}
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
