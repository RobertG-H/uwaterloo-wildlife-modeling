import React from 'react';
import StepViewer from './StepViewer';
import LocationStep from './LocationStep';
import LandCoverStep from './LandCoverStep';
import SlopeStep from './SlopeStep';
import FinalizeStep from './FinalizeStep';
import StepFooter from './StepFooter';

import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
import { ArcContext } from '../../../context/ArcProvider';

import { addHotspotTileLayers } from '../../../context/actions/arc';

import TileLayer from '@arcgis/core/layers/TileLayer';

import './createNewMapStyle.css';
import hotspotMaps from '../../../context/reducers/hotspotsMaps';
// import hotspotMaps from '../../../context/reducers/hotspotsMaps';

// interface Props {}

const CreateNewMapContainer = (props: any) => {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = React.useState(1);
  const [hotspotMap, setHotspotMap] = React.useState(new HotspotMap('0'));

  // TODO move generate map code into separate function
  const { state: hotspotMapsState, dispatch: hotspotMapsDispatch } = React.useContext(HotspotsMapsContext);

  const {
    state: { arcMap, hotspotMapTileLayers },
    dispatch: arcDispatch,
  } = React.useContext(ArcContext);

  const tryAddTileLayers = () => {
    // First check that we don't already have a hotspot with the current arcResId
    if (hotspotMapTileLayers[hotspotMap.arcResId]) {
      console.log('Not adding more tile layers for existing arcresId');
      return;
    }

    addHotspotTileLayers(arcMap, hotspotMap)(arcDispatch);
  };

  const saveHotspotMap = () => {
    hotspotMap.arcResId = '1';
    tryAddTileLayers();
    return;
  };

  return (
    <div className='flex-parent flex-item create-new-map-container'>
      <StepViewer currentStep={currentStep} totalSteps={totalSteps}></StepViewer>
      {currentStep === 1 && <LocationStep />}
      {currentStep === 2 && <LandCoverStep />}
      {currentStep === 3 && <SlopeStep />}
      {currentStep === totalSteps && <FinalizeStep onGenerateHotspotMap={saveHotspotMap} />}

      <StepFooter currentStep={currentStep} totalSteps={totalSteps} isNextActive={true} setCurrentStep={setCurrentStep}></StepFooter>
    </div>
  );
};

export default CreateNewMapContainer;
