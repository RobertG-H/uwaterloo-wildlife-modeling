import React from 'react';
import LoginUI from '../../layout/Login';
import useForm from './useForm';
// interface Props {}

const LoginContainer = (): JSX.Element => {
  return <LoginUI form={useForm()} />;
};

export default LoginContainer;
