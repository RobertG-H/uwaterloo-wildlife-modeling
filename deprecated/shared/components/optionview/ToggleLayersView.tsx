import React from 'react';
import { Divider, Header, Accordion, Icon } from 'semantic-ui-react';
import ToggleLayerAccordian from './ToggleLayerAccordian';
import { OutputContext } from '../../../../OutputProvider';

const ToggleLayersView = (props: any) => {
  const { outputMapDict } = React.useContext(OutputContext);

  const generateToggleLayerRows = () => {
    const rows = [];
    // First do default layers and base
    rows.push(<ToggleLayerAccordian isBasemap={true} arcView={props.arcView} defaultLayers={props.defaultLayers}></ToggleLayerAccordian>);
    // Second do output map layers
    for (const outputMap in outputMapDict!) {
      // Only show maps that have names
      if (outputMapDict[outputMap].outputName !== '') {
        rows.push(
          <ToggleLayerAccordian
            outputMapName={outputMapDict[outputMap].outputName}
            outputMapId={outputMap}
            isBasemap={false}
            arcView={props.arcView}
          ></ToggleLayerAccordian>,
        );
      }
    }
    return rows;
  };

  return <>{generateToggleLayerRows()}</>;
};

export default ToggleLayersView;
