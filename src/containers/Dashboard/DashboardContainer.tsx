import React from 'react';
import { ArcProvider } from '../../context/ArcProvider';
import { HotspotsMapsProvider } from '../../context/HotspotsMapsProvider';

// interface Props {}

const DashboardContainer = (): JSX.Element => {
  return (
    <ArcProvider>
      <HotspotsMapsProvider>
        <h1>Dashboard</h1>
      </HotspotsMapsProvider>
    </ArcProvider>
  );
};

export default DashboardContainer;
