import React from 'react';
import { Step } from 'semantic-ui-react';
import ToggleLayerRow from './ToggleLayerRow';
const ToggleLayersView = (props: any) => {
  const generateToggleLayerRows = () => {
    const rows = [];
    for (const layerName in props.allLayers) {
      //console.log(layerName);
      //console.log(props.allLayers[layerName]);
      rows.push(<ToggleLayerRow layerName={layerName} allLayers={props.allLayers} />);
    }
    return rows;
  };

  return <div>{generateToggleLayerRows()}</div>;
};

export default ToggleLayersView;
