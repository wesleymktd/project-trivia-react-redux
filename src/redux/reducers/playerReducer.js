import {
  LOGIN_INFOS, TOKEN_API, SUM_SCORE, PICTURE_GRAVATAR, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  picture: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_INFOS:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case TOKEN_API:
    return {
      ...state,
      token: action.data.token,
    };
  case SUM_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case PICTURE_GRAVATAR:
    return {
      ...state,
      picture: action.payload,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default: return state;
  }
};

export default player;
