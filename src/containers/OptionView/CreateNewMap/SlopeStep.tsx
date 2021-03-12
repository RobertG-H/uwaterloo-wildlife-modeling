import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

const contentText = (
  <>
    The following percent slope ranges were identified in this region. Input habitat suitabiltiy values for each slope range based on your{' '}
    <b>focal species</b> on a scale from <b>0 (poorest habitat)</b> to 100 <b>(ideal habitat)</b>.
  </>
);

interface Props {
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
}

const SlopeStep = (props: Props) => {
  return (
    <div className='flex-parent flex-item'>
      <StepText title='Assign habitat suitability values by slope %' content={contentText}></StepText>
      <StepInput>content</StepInput>
    </div>
  );
};

export default SlopeStep;
