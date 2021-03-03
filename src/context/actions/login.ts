import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR } from '../../constants/actionTypes';
import React from 'react';
import { auth as firebaseAuth } from '../../firebase';

export const login = ({ password, username }: { password: string; username: string }) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: LOGIN_LOADING,
  });
  console.log('attempting to login');

  firebaseAuth
    .signInWithEmailAndPassword(username, password)
    .then((userCredential: any) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userCredential,
      });
    })
    .catch((error: any) => {
      console.log(error.message);
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    });

  // TODO add firebase loading here
  // axiosInstance()
  //   .post('/auth/login', {
  //     password,
  //     username,
  //   })
  //   .then(res => {
  //     localStorage.token = res.data.token;
  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch(err => {
  //     dispatch({
  //       type: LOGIN_ERROR,
  //       payload: err.response ? err.response.data : 'COULD NOT CONNECT',
  //     });
  //   });
};
