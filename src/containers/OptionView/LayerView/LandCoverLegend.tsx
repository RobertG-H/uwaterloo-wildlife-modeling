import React from 'react';
import ActiveLayerInfo from '@arcgis/core/widgets/Legend/support/ActiveLayerInfo';
import Collection from '@arcgis/core/core/Collection';
import { ArcContext } from '../../../context/ArcProvider';
import LayerAccordian from './LayerAccordian';

import { LAND_COVER_LEGEND_COLORS } from '../../../constants/staticArcResources';

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
    if (rows.length < 2) {
      const newRows: JSX.Element[] = [];
      for (const property in LAND_COVER_LEGEND_COLORS) {
        newRows.push(
          <div key={property} className='land-cover-legend-row'>
            <img src={LAND_COVER_LEGEND_COLORS[property]} />
            <div style={{ marginLeft: 5 }}>{property}</div>
          </div>,
        );
      }
      setRows(newRows);
    }

    // if (legendVM || props.visible === false) {
    //   const activeLayerInfo: Collection<ActiveLayerInfo> | undefined = legendVM?.activeLayerInfos.filter(activeLayerInfo => {
    //     return activeLayerInfo.title === props.activeLayerInfoTitle;
    //   });

    //   if (activeLayerInfo?.getItemAt(0)) {
    //     sleep(500).then(() => {
    //       if (!activeLayerInfo.getItemAt(0).legendElements[0]) return;
    //       const legendItems = activeLayerInfo.getItemAt(0).legendElements[0].infos;
    //       const newRows: JSX.Element[] = [];
    //       if (rows.length < 2) {
    //         legendItems?.forEach(item => {
    //           console.log(item);
    //           newRows.push(
    //             <div key={item.label} className='land-cover-legend-row'>
    //               <img
    //                 src={
    //                   item.src
    //                 }
    //               />
    //               <div style={{ marginLeft: 5 }}>{item.label}</div>
    //             </div>,
    //           );
    //         });

    //         setRows(newRows);
    //       }
    //     });
    //   } else {
    //     displayNoLegend();
    //   }
    // } else {
    //   displayNoLegend();
    // }
  };

  React.useEffect(() => {
    tryToLoadLegend();
  }, [props.visible]);

  React.useEffect(() => {
    tryToLoadLegend();
  }, []);

  return (
    <div style={{ margin: '0px -14px' }}>
      <LayerAccordian title='View Legend' inverted={false} startsOpen={false}>
        <div style={{ margin: '0px 14px' }}>{rows}</div>
      </LayerAccordian>
    </div>
  );
};

export default LandCoverLegend;
