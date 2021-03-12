import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import OutputMapFinalize from './OutputMapFinalize';

interface Props {
  onGenerateHotspotMap(): void;
}

const FinalizeStep = (props: Props) => {
  return (
    <div className='flex-parent flex-item'>
      <StepText title='Finalize' content='temp content'></StepText>
      <StepInput>
        <OutputMapFinalize onGenerateHotspotMap={props.onGenerateHotspotMap}></OutputMapFinalize>
      </StepInput>
    </div>
  );
};

export default FinalizeStep;
