import React from 'react';
import ActiveLayerInfo from '@arcgis/core/widgets/Legend/support/ActiveLayerInfo';
import Collection from '@arcgis/core/core/Collection';
import { ArcContext } from '../../../context/ArcProvider';
import LayerAccordian from './LayerAccordian';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const LandCoverLegend = (props: any) => {
  const [rows, setRows] = React.useState([<div key={1}></div>]);

  const {
    state: { legendVM },
  } = React.useContext(ArcContext);

  const displayNoLegend = () => {
    setRows([
      <div key={0}>
        <i>Layer must be visible to display legend.</i>
      </div>,
    ]);
  };

  const tryToLoadLegend = () => {
    if (legendVM || props.visible === false) {
      const activeLayerInfo: Collection<ActiveLayerInfo> | undefined = legendVM?.activeLayerInfos.filter(activeLayerInfo => {
        return activeLayerInfo.title === props.activeLayerInfoTitle;
      });

      if (activeLayerInfo?.getItemAt(0)) {
        sleep(500).then(() => {
          const legendItems = activeLayerInfo.getItemAt(0).legendElements[0].infos;
          const newRows: JSX.Element[] = [];
          if (rows.length < 2) {
            legendItems?.forEach(item => {
              console.log(item);
              newRows.push(
                <div key={item.label} className='land-cover-legend-row'>
                  <img src={item.src} />
                  <div>{item.label}</div>
                </div>,
              );
            });

            setRows(newRows);
          }
        });
      } else {
        displayNoLegend();
      }
    } else {
      displayNoLegend();
    }
  };

  React.useEffect(() => {
    tryToLoadLegend();
  }, [props.visible]);

  React.useEffect(() => {
    tryToLoadLegend();
  }, []);

  return (
    <div>
      <LayerAccordian title='View Legend' inverted={false}>
        {rows}
      </LayerAccordian>
    </div>
  );
};

export default LandCoverLegend;
