import React from 'react';

// createCtx from: https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052#file-createctx-usereducer-tsx-L1
export default function createCtx<StateType, ActionType>(reducer: React.Reducer<StateType, ActionType>, initialState: StateType) {
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
