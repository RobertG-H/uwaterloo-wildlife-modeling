import React from 'react';
import { Step } from 'semantic-ui-react';

interface Props {
  currentStep: number;
  totalSteps: number;
}

const StepViewer = (props: Props) => {
  const isStepActive = (step: number) => {
    return step === props.currentStep;
  };

  const isStepDisabled = (step: number) => {
    return step > props.currentStep;
  };

  return (
    <Step.Group ordered size='mini' className='step-viewer'>
      <Step className='step-item' active={isStepActive(1)} disabled={isStepDisabled(1)}>
        <Step.Content>
          <Step.Title>Location</Step.Title>
        </Step.Content>
      </Step>

      <Step className='step-item' active={isStepActive(2)} disabled={isStepDisabled(2)}>
        <Step.Content>
          <Step.Title>Land Cover</Step.Title>
        </Step.Content>
      </Step>

      <Step className='step-item' active={isStepActive(3)} disabled={isStepDisabled(3)}>
        <Step.Content>
          <Step.Title>Slope</Step.Title>
        </Step.Content>
      </Step>

      <Step className='step-item' active={isStepActive(props.totalSteps)} disabled={isStepDisabled(props.totalSteps)}>
        <Step.Content>
          <Step.Title>Finalize</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default StepViewer;
