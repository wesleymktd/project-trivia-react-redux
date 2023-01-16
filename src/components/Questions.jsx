import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    arraySort: null,
  };

  componentDidMount() {
    const { question } = this.props;
    const getIndexQuestionsArray = question;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect,
      // difficulty,
    } = getIndexQuestionsArray;
    const array = [correct, ...incorrect];
    console.log(array);
    this.arrayShuffleButtons(array);
  }

  arrayShuffleButtons = (arr) => {
    const { condicionalKey } = this.props;
    if (!condicionalKey) {
      for (let index = arr.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
      }
      this.setState({ arraySort: arr });
    }
  };

  colorsVerify = (answer) => {
    const { question, condicionalKey } = this.props;
    const getIndexQuestionsArray = question;
    const { correct_answer: correct } = getIndexQuestionsArray;
    if (condicionalKey && correct === answer) {
      return 'green';
    } if (condicionalKey) {
      return 'red';
    }
    return '';
  };

  render() {
    const { questions: { timeLeft }, question, func } = this.props;
    const { arraySort } = this.state;
    const getIndexQuestionsArray = question;
    const { category,
      question: textQuestion,
      correct_answer: correct,
      // difficulty,
    } = getIndexQuestionsArray;

    return (
      <main>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{textQuestion}</p>
        <div data-testid="answer-options">
          { arraySort && arraySort.map((answer, i) => {
            const number = -1;
            let incorrectAnswer = number;
            if (answer !== correct) incorrectAnswer += 1;
            return (
              <button
                key={ answer }
                className={ this.colorsVerify(answer, i) }
                type="button"
                data-testid={ answer === correct ? 'correct-answer'
                  : `wrong-answer-${incorrectAnswer}` }
                onClick={ func }
                disabled={ !(timeLeft) }
              >
                {answer}
              </button>
            );
          })}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

Questions.propTypes = {
  questions: PropTypes.objectOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  func: PropTypes.func.isRequired,
  condicionalKey: PropTypes.bool.isRequired,
  question: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Questions);
