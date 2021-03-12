import React from 'react';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { ArcContext } from '../../../context/ArcProvider';

// interface Props {}

const RegionSelect = (props: any) => {
  const [arcSketch, setArcSketch] = React.useState<Sketch | null>(null);
  const graphicsLayer = new GraphicsLayer({});
  const sketchViewRef = React.useRef<HTMLDivElement>(null);

  const {
    state: { arcMapView },
  } = React.useContext(ArcContext);

  React.useEffect(() => {
    if (!arcSketch && sketchViewRef.current && arcMapView) {
      const sketch = new Sketch({
        layer: graphicsLayer,
        view: arcMapView,
        container: sketchViewRef.current,
        visibleElements: {
          undoRedoMenu: false,
          createTools: {
            point: false,
            polyline: false,
            polygon: false,
            rectangle: true,
            circle: false,
          },
          selectionTools: {
            'rectangle-selection': false,
            'lasso-selection': false,
          },
        },
      });

      setArcSketch(sketch);

      sketch.on('create', function (event: any) {
        if (event.state === 'complete' && event.graphic) {
          const minDimension = 60000;
          console.log(event.graphic.geometry.extent.width);
          if (event.graphic.geometry.extent.width > minDimension && event.graphic.geometry.extent.height > minDimension) {
            console.log('CORRECT!');
            //       onSelectRegionCreate();
          }
        }
      });
    }
  }, [arcSketch, sketchViewRef]);

  return (
    <div>
      RegionSelect
      <div ref={sketchViewRef} className={'sketch-view-ref'}></div>
    </div>
  );
};

export default RegionSelect;
