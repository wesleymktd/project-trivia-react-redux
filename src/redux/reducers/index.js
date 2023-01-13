import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import responseQuestionsTrivia from './questionReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  questions: responseQuestionsTrivia,
});

export default rootReducer;
