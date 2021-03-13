import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import FactorTable from './FactorTable';

interface Props {
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
  stepCompleted: boolean;
  onStepCompleted(stepIndex: number): void;
  stepIndex: number;
}

const contentText = (
  <>
    The following land cover types were found in the layer data for this region. Input habitat suitabiltiy values for each factor based on
    your <b>focal species</b> on a scale from <b>0 (poorest habitat)</b> to 100 <b>(ideal habitat)</b>.
  </>
);

const LandCoverStep = (props: Props) => {
  React.useEffect(() => {
    props.onStepCompleted(props.stepIndex);
  }, []);
  return (
    <div className='flex-parent flex-item'>
      <StepText title='Assign habitat suitability values by land cover' content={contentText}></StepText>
      <StepInput>
        <FactorTable title='LAND COVER FACTOR' factorValues={props.hotspotMap.landCoverValues} />
      </StepInput>
    </div>
  );
};

export default LandCoverStep;
