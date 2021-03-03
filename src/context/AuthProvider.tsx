import React, { createContext, useReducer, Children } from 'react';
import auth from './reducers/auth';
import authInitialState from './initialstates/authInitialState';

import arc from './reducers/arc';
import arcInititialState from './initialstates/arcInititialState';
import hotspotsMaps from './reducers/hotspotsMaps';
import hotspotMapsInitialState from './initialstates/hotspotMapsInitialState';

// createCtx from: https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052#file-createctx-usereducer-tsx-L1
export function createCtx<StateType, ActionType>(reducer: React.Reducer<StateType, ActionType>, initialState: StateType) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState; // we never actually use this
  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
  });
  function Provider(props: React.PropsWithChildren<Record<string, unknown>>) {
    const [state, dispatch] = React.useReducer<React.Reducer<StateType, ActionType>>(reducer, initialState);
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  }
  return [ctx, Provider] as const;
}

const [ctx, Provider] = createCtx(auth, authInitialState);
export const GlobalContext = ctx;

//export const GlobalContext = createContext({});

// TODO update this to authprovider and then move the other contexts to their own setups
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //const [authState, authDispatch] = useReducer(auth, authInitialState);
  // const [arcState, arcDispatch] = useReducer(arc, arcInititialState);
  // const [hotspotsMapsState, hotspotsMapsDispatch] = useReducer(hotspotsMaps, hotspotMapsInitialState);

  return (
    <Provider>{children}</Provider>
    // <GlobalContext.Provider
    //   value={{
    //     authState,
    //     authDispatch,
    //     arcState,
    //     arcDispatch,
    //     hotspotsMapsState,
    //     hotspotsMapsDispatch,
    //   }}
    // >
    //   {children}
    // </GlobalContext.Provider>
  );
};
