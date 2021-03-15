import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import OutputMapFinalize from './OutputMapFinalize';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

const contentText = <>Which of the following output map types you would like to generate?</>;

interface Props {
  onGenerateHotspotMap(arcResId: string): void;
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
}

const FinalizeStep = (props: Props) => {
  const setName = (newName: string) => {
    props.setHotspotMap({
      ...props.hotspotMap,
      outputName: newName,
    });
  };

  return (
    <div className='flex-parent flex-item'>
      <StepText title='Finalize Output Maps' content={contentText}></StepText>
      <StepInput>
        <OutputMapFinalize
          initName={props.hotspotMap.outputName}
          onNameInput={setName}
          onGenerateHotspotMap={props.onGenerateHotspotMap}
        ></OutputMapFinalize>
      </StepInput>
    </div>
  );
};

export default FinalizeStep;
