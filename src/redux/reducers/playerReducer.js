import { LOGIN_INFOS } from '../actions';

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
      ...action.payload,
    };
  default: return state;
  }
};
export default player;
