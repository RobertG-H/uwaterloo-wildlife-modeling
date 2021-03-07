import React from 'react';
import createCtx from '../utils/createCtx';
import hotspotsMaps from './reducers/hotspotsMaps';
import hotspotMapsInitialState from './initialstates/hotspotMapsInitialState';

const [ctx, Provider] = createCtx(hotspotsMaps, hotspotMapsInitialState);
export const HotspotsMapsContext = ctx;

export const HotspotsMapsProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
