import React from 'react';
import { Step } from 'semantic-ui-react';
import Legend from '@arcgis/core/widgets/Legend';
import * as watchUtils from '@arcgis/core/core/watchUtils';

const LegendView = (props: any) => {
  const legendViewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const arcLegend = new Legend({
      view: props.arcView,
      container: legendViewRef.current!,
      layerInfos: [
        {
          hideLayers: [0],
          layer: props.allLayers['Land Cover'],
          title: 'Test',
        },
        {
          hideLayers: [0],
          layer: props.allLayers['Connectivity'],
          title: 'Test2',
        },
      ],
    });

    watchUtils.when(arcLegend, 'container', function () {
      console.log('Manually updating legend');
      const list = document.getElementsByClassName('esri-legend__layer-caption');
      console.log(list);
      for (const item of list) {
        console.log(item);
      }
    });
  }, []);

  return <div ref={legendViewRef} className={'arcViewDiv'}></div>;
};

export default LegendView;
