import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import FactorTable from './FactorTable';

const contentText = (
  <>
    The following percent slope ranges were identified in this region. Input habitat suitabiltiy values for each slope range based on your{' '}
    <b>focal species</b> on a scale from <b>0 (poorest habitat)</b> to 100 <b>(ideal habitat)</b>.
  </>
);

interface Props {
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
  stepCompleted: boolean;
  onStepCompleted(stepIndex: number): void;
  stepIndex: number;
}

const SlopeStep = (props: Props) => {
  React.useEffect(() => {
    props.onStepCompleted(props.stepIndex);
  }, []);

  return (
    <div className='flex-parent flex-item'>
      <StepText title='Assign habitat suitability values by slope %' content={contentText}></StepText>
      <StepInput>
        <FactorTable title='PERCENT SLOPE' factorValues={props.hotspotMap.slopeValues} />
      </StepInput>
    </div>
  );
};

export default SlopeStep;
