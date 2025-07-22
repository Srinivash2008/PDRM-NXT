import * as ActionTypes from '../constants/actionTypes';
import { loginSuccess, loginFailure } from "../constants/actionTypes";

const login = (credentials) => {

  return {
    type: ActionTypes.API,
    payload: {
      url: `${import.meta.env.VITE_BASE_URL}/loginUser`,
      method: 'POST',
      data: credentials,
      onSuccess: (data) => {
        return (dispatch) => {
          dispatch(loginSuccess(data));
        };
      },
      onError: (error) => {
        console.log(error, "error");
        return (dispatch) => {
          dispatch(loginFailure({ error: error }));
        };
      },
      label: 'LOGIN',
      headers: {
        'Content-Type': 'application/json'
      }
    },
  }
};


export { login }