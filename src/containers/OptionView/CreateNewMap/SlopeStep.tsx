import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';

// interface Props {}

const SlopeStep = (props: any) => {
  return (
    <div className='flex-parent flex-item'>
      <StepText title='Slope' content='temp content'></StepText>
      <StepInput>content</StepInput>
    </div>
  );
};

export default SlopeStep;
