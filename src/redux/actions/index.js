import requestTokenApi from '../services/requestToken';

export const LOGIN_INFOS = 'LOGIN_INFOS';
export const TOKEN_API = 'TOKEN_API';

export const loginInfosPlayer = (payload) => ({
  type: LOGIN_INFOS,
  payload,
});

export const receiveApiToken = (data) => ({
  type: TOKEN_API,
  data,
});

export function actionFetchApi() {
  return async (dispatch) => {
    const response = await requestTokenApi();
    dispatch(receiveApiToken(response));
  };
}
