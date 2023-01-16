import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  arrayShuffleButtons = (arr) => {
    const { condicionalKey } = this.props;
    if (!condicionalKey) {
      for (let index = arr.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
      }
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
    const getIndexQuestionsArray = question;
    const { category,
      question: textQuestion,
      correct_answer: correct,
      incorrect_answers: incorrect,
      // difficulty,
    } = getIndexQuestionsArray;
    const array = [correct, ...incorrect];
    this.arrayShuffleButtons(array);

    return (
      <main>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{textQuestion}</p>
        <div data-testid="answer-options">
          { array.map((answer, i) => {
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
