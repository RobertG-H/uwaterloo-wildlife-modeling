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
import { getFinalSlopeValues, getFinalLandCoverValeus } from '../../../context/initialstates/hotspotMapsInitialState';

interface Props {
  onCreateNewMapComplete(): void;
}

const CreateNewMapContainer = (props: Props) => {
  const totalSteps = 4;
  const locationStepIndex = 0;
  const [currentStep, setCurrentStep] = React.useState(1);
  const [hotspotMap, setHotspotMap] = React.useState(CreateEmptyHotspotMap(uuidv4()));
  const [completedSteps, setCompletedSteps] = React.useState(() => {
    const falseArray = [];
    for (let i = 0; i < totalSteps; i++) {
      falseArray.push(false);
    }
    return falseArray;
  });

  const { state: hotspotMapsState, dispatch: hotspotMapsDispatch } = React.useContext(HotspotsMapsContext);

  const {
    state: { arcMap, hotspotMapTileLayers, regionSelectLayers, defaultLayers },
    dispatch: arcDispatch,
  } = React.useContext(ArcContext);

  // To be called when everything complete.
  const saveHotspotMap = (arcResId: string) => {
    hotspotMap.arcResId = arcResId;
    hotspotMap.landCoverValues = getFinalLandCoverValeus();
    hotspotMap.slopeValues = getFinalSlopeValues();
    tryAddTileLayers();
    props.onCreateNewMapComplete();
  };

  const tryAddTileLayers = () => {
    // First check that we don't already have a hotspot with the current arcResId
    if (hotspotMapTileLayers[hotspotMap.arcResId]) {
      console.log('Not adding more tile layers for existing arcresId');
      return;
    }
    addHotspotTileLayers(arcMap, hotspotMap)(arcDispatch);
    hotspotAdd(hotspotMap)(hotspotMapsDispatch);
  };

  const onStepCompleted = (stepIndex: number) => {
    if (stepIndex === locationStepIndex) {
      handleLocationStepComplete();
    }
    setCompletedSteps(
      completedSteps.map((step, index) => {
        if (index === stepIndex) return true;
        else return step;
      }),
    );
  };

  const isNextActive = () => {
    for (let i = 0; i < currentStep; i++) {
      if (completedSteps[i] === false) return false;
    }
    return true;
  };

  const handleLocationStepComplete = () => {
    regionSelectLayers[0].visible = false;
    regionSelectLayers[1].visible = true;
  };

  React.useEffect(() => {
    regionSelectLayers[0].visible = true;
    return () => {
      // Always hide feature layers on close.
      regionSelectLayers[0].visible = false;
      regionSelectLayers[1].visible = false;
    };
  }, [regionSelectLayers]);

  const onEnterLocationStep = () => {
    defaultLayers.forEach(tileLayer => {
      tileLayer.opacity = 0;
    });
  };

  const onEnterLandCoverStep = () => {
    defaultLayers.forEach(tileLayer => {
      tileLayer.opacity = 0;
    });
    defaultLayers[0].opacity = 1;
  };

  const onEnterSlopeStop = () => {
    defaultLayers.forEach(tileLayer => {
      tileLayer.opacity = 0;
    });
    defaultLayers[1].opacity = 1;
  };

  const onEnterFinalStep = () => {
    defaultLayers.forEach(tileLayer => {
      tileLayer.opacity = 0;
    });
  };

  React.useEffect(() => {
    if (currentStep === 1) {
      onEnterLocationStep();
    } else if (currentStep === 2) {
      onEnterLandCoverStep();
    } else if (currentStep === 3) {
      onEnterSlopeStop();
    } else if (currentStep === 4) {
      onEnterFinalStep();
    }
  }, [currentStep]);

  React.useEffect(() => {
    for (const arcResId in hotspotMapTileLayers) {
      hotspotMapTileLayers[arcResId].forEach(tileLayer => {
        tileLayer.opacity = 0;
      });
    }
  }, []);

  return (
    <div className='flex-parent flex-item create-new-map-container'>
      <StepViewer currentStep={currentStep} totalSteps={totalSteps}></StepViewer>
      {currentStep === 1 && (
        <LocationStep
          hotspotMap={hotspotMap}
          setHotspotMap={setHotspotMap}
          onStepCompleted={onStepCompleted}
          stepCompleted={completedSteps[locationStepIndex]}
          stepIndex={locationStepIndex}
        />
      )}
      {currentStep === 2 && (
        <LandCoverStep
          hotspotMap={hotspotMap}
          setHotspotMap={setHotspotMap}
          onStepCompleted={onStepCompleted}
          stepCompleted={completedSteps[1]}
          stepIndex={1}
        />
      )}
      {currentStep === 3 && (
        <SlopeStep
          hotspotMap={hotspotMap}
          setHotspotMap={setHotspotMap}
          onStepCompleted={onStepCompleted}
          stepCompleted={completedSteps[2]}
          stepIndex={2}
        />
      )}
      {currentStep === totalSteps && (
        <FinalizeStep hotspotMap={hotspotMap} setHotspotMap={setHotspotMap} onGenerateHotspotMap={saveHotspotMap} />
      )}

      <StepFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        isNextActive={isNextActive()}
        setCurrentStep={setCurrentStep}
      ></StepFooter>
    </div>
  );
};

export default CreateNewMapContainer;
