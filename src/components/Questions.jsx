import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestQuestionApi from '../redux/services/requestQuestions';
import { questionAct } from '../redux/actions';

class Questions extends Component {
  state = {
    questFull: [],
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
    }
    this.setState({
      questFull: [...responseApi.results],
    });
    dispatch(questionAct(responseApi));
  }

  
  render() {
    const { category, question } = this.props;
    // const { questFull } = this.state;
    return (
      <div>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{question}</p>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.requestQuestions }
        >
          Configurações
        </button>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  question: state.questions.results,
  category: state.wallet.editor,
});

Questions.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Questions);

/// ///////

// src/components/Question.js
// import React from 'react';
// import PropTypes from 'prop-types';
// class Question extends React.Component {
//   fisherYatesShuffle = (arr) => {
//     for (let i = arr.length - 1; i > 0; i -= 1) {
//       const j = Math.floor(Math.random() * (i + 1)); // random index
//       [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
//     }
//   }
//   render() {
//     const {
//       question:
//       { category, question, correct_answer: correct, incorrect_answers: incorrect },
//     } = this.props;
//     const array = [correct, ...incorrect];
//     this.fisherYatesShuffle(array);
//     return (
//       <main>
//         <p data-testid="question-category">{category}</p>
//         <p data-testid="question-text">{question}</p>
//         <div data-testid="answer-options">
//           { array.map((answer) => {
//             const MINUSONE = -1;
//             let incorrectIndex = MINUSONE;
//             if (answer !== correct) incorrectIndex += 1;
//             return (
//               <button
//                 key={ answer }
//                 type="button"
//                 data-testid={ answer === correct ? 'correct-answer'
//                   : `wrong-answer-${incorrectIndex}` }
//               >
//                 {answer}
//               </button>);
//           }) }
//         </div>
//       </main>
//     );
//   }
// }
// Question.propTypes = {
//   question: PropTypes.objectOf(PropTypes.any).isRequired,
// };
// export default Question;
