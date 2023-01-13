import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  state = {
    condicionalKey: false,
  };

  arrayShuffleButtons = (arr) => {
    const { condicionalKey } = this.state;
    if (!condicionalKey) {
      for (let index = arr.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
      }
    }
  };

  colorsVerify = (answer, index) => {
    const { condicionalKey } = this.state;
    const { questions: { questions } } = this.props;
    const getIndexQuestionsArray = questions[index];
    const { correct_answer: correct } = getIndexQuestionsArray;
    if (condicionalKey && correct === answer) {
      return 'green';
    } if (condicionalKey) {
      return 'red';
    }
    return '';
  };

  render() {
    const index = 0;
    const { questions: { questions } } = this.props;
    const getIndexQuestionsArray = questions[index];
    const { category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect } = getIndexQuestionsArray;
    const array = [correct, ...incorrect];
    this.arrayShuffleButtons(array);

    return (
      <main>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
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
                onClick={ () => this.setState({ condicionalKey: true }) }
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
};

export default connect(mapStateToProps)(Questions);
