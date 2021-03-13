import React from 'react';
import StepViewer from './StepViewer';
import LocationStep from './LocationStep';
import LandCoverStep from './LandCoverStep';
import SlopeStep from './SlopeStep';
import FinalizeStep from './FinalizeStep';
import StepFooter from './StepFooter';

import { CreateEmptyHotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
import { ArcContext } from '../../../context/ArcProvider';

import { addHotspotTileLayers } from '../../../context/actions/arc';
import { hotspotAdd } from '../../../context/actions/hotspotmaps';
import { v4 as uuidv4 } from 'uuid';

import './createNewMapStyle.css';
import hotspotMaps from '../../../context/reducers/hotspotsMaps';

// interface Props {}

const CreateNewMapContainer = (props: any) => {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = React.useState(1);
  const [hotspotMap, setHotspotMap] = React.useState(CreateEmptyHotspotMap(uuidv4()));

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
    hotspotAdd(hotspotMap)(hotspotMapsDispatch);
  };

  const saveHotspotMap = (arcResId: string) => {
    hotspotMap.arcResId = arcResId;
    tryAddTileLayers();
    return;
  };

  return (
    <div className='flex-parent flex-item create-new-map-container'>
      <StepViewer currentStep={currentStep} totalSteps={totalSteps}></StepViewer>
      {currentStep === 1 && <LocationStep hotspotMap={hotspotMap} setHotspotMap={setHotspotMap} />}
      {currentStep === 2 && <LandCoverStep hotspotMap={hotspotMap} setHotspotMap={setHotspotMap} />}
      {currentStep === 3 && <SlopeStep hotspotMap={hotspotMap} setHotspotMap={setHotspotMap} />}
      {currentStep === totalSteps && (
        <FinalizeStep hotspotMap={hotspotMap} setHotspotMap={setHotspotMap} onGenerateHotspotMap={saveHotspotMap} />
      )}

      <StepFooter currentStep={currentStep} totalSteps={totalSteps} isNextActive={true} setCurrentStep={setCurrentStep}></StepFooter>
    </div>
  );
};

export default CreateNewMapContainer;
