import React from 'react';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { ArcContext } from '../../../context/ArcProvider';
import { Button, Segment, Header, Image } from 'semantic-ui-react';
import regionImage from '../../../assets/images/cycle3-selected-region.png';

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
      <Segment style={{ margin: 'auto' }}>
        <div style={{ padding: '10px' }}>
          <strong>Box Select Tool</strong>
        </div>
        <Button style={{ backgroundColor: 'rgb(36,36,36)', padding: 0, marginLeft: 15 }}>
          <div ref={sketchViewRef} className={'sketchViewRef'}></div>
        </Button>
      </Segment>
      <Segment>
        <Header as='h5'>Preview of selected region</Header>
        <Image src={arcSketch ? regionImage : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='medium' centered></Image>
      </Segment>
    </div>
  );
};

export default RegionSelect;
