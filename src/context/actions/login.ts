import { LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR } from '../../constants/actionTypes';
import React from 'react';
import { auth as firebaseAuth } from '../../firebase';

export const login = ({ password, username }: { password: string; username: string }) => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  firebaseAuth
    .signInWithEmailAndPassword(username, password)
    .then((userCredential: any) => {
      console.log(userCredential);
      localStorage.token = userCredential.user.getIdToken();
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userCredential,
      });
    })
    .catch((error: any) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    });
};
