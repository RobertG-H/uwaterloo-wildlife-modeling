import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import RegionSelect from './RegionSelect';
import ExtentSelect from './ExtentSelect';
import './createNewMapStyle.css';

// interface Props {}

const LocationStep = (props: any) => {
  return (
    <div className='flex-parent flex-item'>
      <StepText title='Identify the study region' content='temp content'></StepText>
      <StepInput>
        <RegionSelect></RegionSelect>
        <ExtentSelect></ExtentSelect>
      </StepInput>
    </div>
  );
};

export default LocationStep;
