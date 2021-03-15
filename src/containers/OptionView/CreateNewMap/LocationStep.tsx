import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import RegionSelect from './RegionSelect';
import ExtentSelect from './ExtentSelect';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import './createNewMapStyle.css';

import { ArcContext } from '../../../context/ArcProvider';
import hotspotMaps from '../../../context/reducers/hotspotsMaps';

const contentText =
  'Please identify the study region you wish to analyze by selecting an area on the map using the box tool or by inputting the geographic boundaries of the extent in easting & northing.';

interface Props {
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
  stepCompleted: boolean;
  onStepCompleted(stepIndex: number): void;
  stepIndex: number;
}

const LocationStep = (props: Props) => {
  const [regionSelected, setRegionSelected] = React.useState(props.stepCompleted);

  const onStepCompleted = () => {
    if (regionSelected) return;
    setRegionSelected(true);
    const newExtent = [11895207.411419, 1282809.161558, 1338609.161558, 11858247.411419];
    onExtent(newExtent);
    props.onStepCompleted(props.stepIndex);
  };

  const onExtent = (newExtent: number[]) => {
    props.setHotspotMap({
      ...props.hotspotMap,
      extent: newExtent,
    });
  };

  return (
    <div className='flex-parent flex-item'>
      <StepText title='Identify the study region' content={contentText}></StepText>
      <StepInput>
        <RegionSelect onRegionSelected={onStepCompleted} regionSelected={regionSelected}></RegionSelect>
        <ExtentSelect onInput={onExtent} initExtent={props.hotspotMap.extent}></ExtentSelect>
      </StepInput>
    </div>
  );
};

export default LocationStep;
