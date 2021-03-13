import React from 'react';
import './createNewMapStyle.css';
import { Button } from 'semantic-ui-react';

interface Props {
  totalSteps: number;
  currentStep: number;
  isNextActive: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepFooter = (props: Props) => {
  const onNext = () => {
    if (props.currentStep === props.totalSteps) {
      return;
    }
    props.setCurrentStep(props.currentStep + 1);
  };

  const onBack = () => {
    if (props.currentStep === 1) {
      return;
    }
    props.setCurrentStep(props.currentStep - 1);
  };

  const doShowBack = () => {
    return props.currentStep !== 1;
  };

  const doShowNext = () => {
    return props.currentStep !== props.totalSteps;
  };

  return (
    <div className='step-footer'>
      <div>{doShowBack() && <Button onClick={onBack}>Back</Button>}</div>
      <div>{doShowNext() && <Button onClick={onNext}>Next</Button>}</div>
    </div>
  );
};

export default StepFooter;
