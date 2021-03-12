import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import OutputMapFinalize from './OutputMapFinalize';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

const contentText = <>Which of the following output map types you would like to generate?</>;

interface Props {
  onGenerateHotspotMap(): void;
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
}

const FinalizeStep = (props: Props) => {
  return (
    <div className='flex-parent flex-item'>
      <StepText title='Choose Output Maps' content={contentText}></StepText>
      <StepInput>
        <OutputMapFinalize onGenerateHotspotMap={props.onGenerateHotspotMap}></OutputMapFinalize>
      </StepInput>
    </div>
  );
};

export default FinalizeStep;
