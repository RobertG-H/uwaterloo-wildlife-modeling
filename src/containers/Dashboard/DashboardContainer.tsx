import React from 'react';
import { ArcProvider } from '../../context/ArcProvider';
import { HotspotsMapsProvider } from '../../context/HotspotsMapsProvider';
import { ArcMapContainer } from './';
import ArcAuthContainer from '../ArcAuthContainer';
import SidebarContainer from '../SidebarContainer';
import { Header } from '../../components/Header';

// interface Props {}

const DashboardContainer = (): JSX.Element => {
  return (
    <ArcProvider>
      <HotspotsMapsProvider>
        <ArcAuthContainer>
          <Header></Header>
          <SidebarContainer></SidebarContainer>
          <ArcMapContainer />
        </ArcAuthContainer>
      </HotspotsMapsProvider>
    </ArcProvider>
  );
};

export default DashboardContainer;
