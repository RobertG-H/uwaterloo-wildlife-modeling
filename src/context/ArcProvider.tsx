import React from 'react';
import createCtx from '../utils/createCtx';
import arc from './reducers/arc';
import arcInititialState from './initialstates/arcInititialState';

const [ctx, Provider] = createCtx(arc, arcInititialState);
export const ArcContext = ctx;

export const ArcProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
