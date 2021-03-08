import React from 'react';
import { ArcProvider } from '../../context/ArcProvider';
import { HotspotsMapsProvider } from '../../context/HotspotsMapsProvider';
import { ArcMapContainer } from './';

// interface Props {}

const DashboardContainer = (): JSX.Element => {
  return (
    <ArcProvider>
      <HotspotsMapsProvider>
        <h1>Dashboard</h1>
        <ArcMapContainer />
      </HotspotsMapsProvider>
    </ArcProvider>
  );
};

export default DashboardContainer;
