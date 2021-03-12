import React from 'react';
import StepViewer from './StepViewer';
import LocationStep from './LocationStep';
import LandCoverStep from './LandCoverStep';
import SlopeStep from './SlopeStep';
import FinalizeStep from './FinalizeStep';
import StepFooter from './StepFooter';

import './createNewMapStyle.css';

// interface Props {}

const CreateNewMapContainer = (props: any) => {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = React.useState(1);

  return (
    <div className='flex-parent flex-item create-new-map-container'>
      <StepViewer currentStep={currentStep} totalSteps={totalSteps}></StepViewer>
      {currentStep === 1 && <LocationStep />}
      {currentStep === 2 && <LandCoverStep />}
      {currentStep === 3 && <SlopeStep />}
      {currentStep === totalSteps && <FinalizeStep />}

      <StepFooter currentStep={currentStep} totalSteps={totalSteps} isNextActive={true} setCurrentStep={setCurrentStep}></StepFooter>
    </div>
  );
};

export default CreateNewMapContainer;
