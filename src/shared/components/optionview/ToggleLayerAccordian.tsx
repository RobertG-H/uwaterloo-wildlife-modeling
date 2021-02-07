import React from 'react';
import { ChangeEvent } from 'react';
import { OutputContext } from '../../../OutputProvider';
import ToggleLayerRow from './ToggleLayerRow';
import { Header, Accordion, Icon } from 'semantic-ui-react';

const ToggleLayerAccordian = (props: any) => {
  const { outputMapDict } = React.useContext(OutputContext);
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClick = (e: any, titleProps: any) => {
    setIsVisible(!isVisible);
  };

  const generateOutputMapRows = (outputMap: string) => {
    const rows = [];
    if (outputMapDict![outputMap]) {
      for (const layerName in outputMapDict![outputMap].tileLayers) {
        const layer = outputMapDict![outputMap].tileLayers![layerName];
        rows.push(<ToggleLayerRow layerName={layerName} layer={layer} />);
      }
    }
    return rows;
  };

  const generateDefaultMapRows = () => {
    const rows = [];
    // Base Map
    rows.push(
      <ToggleLayerRow
        layerName={'Basemap'}
        layer={props.arcView!.allLayerViews.getItemAt(0).layer}
        layer2={props.arcView!.allLayerViews.getItemAt(1).layer}
      />,
    );
    for (const layerName in props.defaultLayers) {
      const layer = props.defaultLayers![layerName];
      rows.push(<ToggleLayerRow layerName={layerName} layer={layer} />);
    }
    return rows;
  };

  if (props.isBasemap) {
    return (
      <>
        <Accordion>
          <Accordion.Title
            style={{ textAlign: 'left', paddingLeft: 10, backgroundColor: 'rgb(224 229 244)', marginBottom: 10, minWidth: 200 }}
            as={'h5'}
            active={isVisible}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            {'Default Layers'}
          </Accordion.Title>
          <Accordion.Content active={isVisible}>{generateDefaultMapRows()}</Accordion.Content>
        </Accordion>
      </>
    );
  }

  return (
    <>
      <Accordion>
        <Accordion.Title
          style={{ textAlign: 'left', paddingLeft: 10, backgroundColor: 'rgb(224 229 244)', marginBottom: 10, minWidth: 200 }}
          as={'h5'}
          active={isVisible}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          {props.outputMapName}
        </Accordion.Title>
        <Accordion.Content active={isVisible}>{generateOutputMapRows(props.outputMapId)}</Accordion.Content>
      </Accordion>
    </>
  );
};

export default ToggleLayerAccordian;
