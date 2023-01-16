import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionSumScore } from '../redux/actions';

const NUMBER_TEN = 10;

class Questions extends Component {
  state = {
    arraySort: null,
    painted: false,
  };

  componentDidMount() {
    this.funcTest();
  }

  funcTest = () => {
    const { question } = this.props;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = question;
    const array = [correct, ...incorrect];
    this.arrayShuffleButtons(array);
  };

  arrayShuffleButtons = (arr) => {
    const { painted } = this.state;
    if (!painted) {
      for (let index = arr.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
      }
      this.setState({ arraySort: arr });
    }
  };

  colorsVerify = (answer) => {
    const { question } = this.props;
    const { painted } = this.state;
    const { correct_answer: correct } = question;
    if (painted && correct === answer) {
      return 'green';
    } if (painted) {
      return 'red';
    }
    return '';
  };

  sumScore = (event) => {
    const { questions: { timeLeft }, question: { difficulty }, dispatch } = this.props;
    const isCorrect = event.target
      .attributes['data-testid'].value.includes('correct-answer');
    if (isCorrect) {
      const objectConvert = { hard: 3, medium: 2, easy: 1 };
      const total = NUMBER_TEN + (timeLeft * objectConvert[difficulty]);
      dispatch(actionSumScore(total));
    }
  };

  render() {
    const {
      questions: { timeLeft },
      question,
      func,
      nextOnClick,
      condicionalKey } = this.props;
    const { arraySort } = this.state;
    const { category,
      question: textQuestion,
      correct_answer: correct,
      // difficulty,
    } = question;
    const number = -1;
    let incorrectAnswer = number;

    return (
      <main>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{textQuestion}</p>
        <div data-testid="answer-options">
          { arraySort && arraySort.map((answer, i) => {
            if (answer !== correct) incorrectAnswer += 1;
            return (
              <button
                key={ answer }
                className={ this.colorsVerify(answer, i) }
                type="button"
                data-testid={ answer === correct ? 'correct-answer'
                  : `wrong-answer-${incorrectAnswer}` }
                onClick={ (event) => {
                  this.setState({ painted: true }, func);
                  this.sumScore(event);
                } }
                disabled={ !(timeLeft) }
              >
                {answer}
              </button>

            );
          })}
          {condicionalKey && (
            <button
              type="button"
              onClick={ () => {
                nextOnClick();
                this.setState({ painted: false }, this.funcTest);
              } }
              data-testid="btn-next"
            >
              {' '}
              Next
            </button>

          )}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

Questions.propTypes = {
  condicionalKey: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
  question: PropTypes.arrayOf(PropTypes.string).isRequired,
  questions: PropTypes.objectOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  timeLeft: PropTypes.number.isRequired,
  nextOnClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Questions);
