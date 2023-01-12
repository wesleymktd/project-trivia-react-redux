import { LOGIN_INFOS, TOKEN_API } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

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
  default: return state;
  }
};

export default player;
