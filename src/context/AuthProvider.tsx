import React from 'react';
import createCtx from '../utils/createCtx';
import auth from './reducers/auth';
import authInitialState from './initialstates/authInitialState';

const [ctx, Provider] = createCtx(auth, authInitialState);
export const AuthContext = ctx;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
