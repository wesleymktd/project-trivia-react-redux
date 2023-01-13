import { QUESTIONS_SET } from '../actions';

const INITIAL_STATE = {
  questions: [],
  category: '',
  answered: false,
};
const responseQuestionsTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case QUESTIONS_SET:
    return {
      ...state,
      questions: action.questions.results,
    };
  default: return state;
  }
};

export default responseQuestionsTrivia;
