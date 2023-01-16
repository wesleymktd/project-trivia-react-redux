import { QUESTIONS_SET, TIMMER_UPDATE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  category: '',
  answered: false,
  timeLeft: 30,
};
const responseQuestionsTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_SET:
    return {
      ...state,
      questions: action.questions.results,
    };
  case TIMMER_UPDATE:
    return {
      ...state,
      timeLeft: action.payload,
    };
  default: return state;
  }
};

export default responseQuestionsTrivia;
