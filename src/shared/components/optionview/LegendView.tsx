import React from 'react';
import Legend from '@arcgis/core/widgets/Legend';
import { OutputContext } from '../../../OutputProvider';

const LegendView = (props: any) => {
  const legendViewRef = React.useRef<HTMLDivElement>(null);
  const { outputMapDict } = React.useContext(OutputContext);

  React.useEffect(() => {
    console.log('Adding legend');
    const layerInfos = [];

    // First do default layers
    for (const layerName in props.defaultLayers) {
      layerInfos.push({
        hideLayers: [0],
        layer: props.defaultLayers[layerName],
        title: layerName,
      });
    }

    // Second do output map layers
    for (const outputMap in outputMapDict!) {
      // Only show maps that have names
      if (outputMapDict[outputMap].outputName !== '') {
        for (const layerName in outputMapDict[outputMap].tileLayers) {
          const legendLayerName = outputMapDict[outputMap].outputName + ' - ' + layerName;
          layerInfos.push({
            hideLayers: [0],
            layer: outputMapDict[outputMap].tileLayers![layerName],
            title: legendLayerName,
          });
        }
      }
    }

    const arcLegend = new Legend({
      view: props.arcView,
      container: legendViewRef.current!,
      layerInfos: layerInfos,
    });
  }, []);

  return <div ref={legendViewRef} className={'legendViewRef'}></div>;
};

export default LegendView;
