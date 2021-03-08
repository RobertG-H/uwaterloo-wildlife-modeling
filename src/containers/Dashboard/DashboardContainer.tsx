import React from 'react';
import { ArcProvider } from '../../context/ArcProvider';
import { HotspotsMapsProvider } from '../../context/HotspotsMapsProvider';
import { ArcMapContainer } from './';
import ArcAuthContainer from '../ArcAuthContainer';

// interface Props {}

const DashboardContainer = (): JSX.Element => {
  return (
    <ArcProvider>
      <HotspotsMapsProvider>
        <ArcAuthContainer>
          <h1>Dashboard</h1>
          <ArcMapContainer />
        </ArcAuthContainer>
      </HotspotsMapsProvider>
    </ArcProvider>
  );
};

export default DashboardContainer;
