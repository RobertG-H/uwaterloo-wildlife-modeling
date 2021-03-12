import React from 'react';
import StepText from './StepText';
import StepInput from './StepInput';
import RegionSelect from './RegionSelect';
import ExtentSelect from './ExtentSelect';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';
import './createNewMapStyle.css';

import { ArcContext } from '../../../context/ArcProvider';

const contentText =
  'Please identify the study region you wish to analyze by selecting an area on the map using the box tool or by inputting the geographic boundaries of the extent in easting & northing.';

interface Props {
  hotspotMap: HotspotMap;
  setHotspotMap: React.Dispatch<React.SetStateAction<HotspotMap>>;
}

const LocationStep = (props: Props) => {
  const {
    state: { regionSelectLayers },
  } = React.useContext(ArcContext);

  const onExtent = (newExtent: number[]) => {
    props.setHotspotMap({
      ...props.hotspotMap,
      extent: newExtent,
    });
  };

  React.useEffect(() => {
    regionSelectLayers[0].visible = true;
    return () => {
      regionSelectLayers[0].visible = false;
    };
  }, [regionSelectLayers]);

  return (
    <div className='flex-parent flex-item'>
      <StepText title='Identify the study region' content={contentText}></StepText>
      <StepInput>
        <RegionSelect></RegionSelect>
        <ExtentSelect></ExtentSelect>
      </StepInput>
    </div>
  );
};

export default LocationStep;
