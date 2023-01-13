import requestTokenApi from '../services/requestToken';

export const LOGIN_INFOS = 'LOGIN_INFOS';
export const TOKEN_API = 'TOKEN_API';
export const QUESTIONS_SET = 'QUESTIONS_SET';

export const loginInfosPlayer = (payload) => ({
  type: LOGIN_INFOS,
  payload,
});

export const receiveApiToken = (data) => ({
  type: TOKEN_API,
  data,
});

export const questionAct = (questions) => ({
  type: QUESTIONS_SET,
  questions,
});

export function actionFetchApi() {
  return async (dispatch) => {
    const response = await requestTokenApi();
    dispatch(receiveApiToken(response));
  };
}
