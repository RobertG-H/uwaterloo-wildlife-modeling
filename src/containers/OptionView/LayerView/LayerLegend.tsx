import React from 'react';
import ActiveLayerInfo from '@arcgis/core/widgets/Legend/support/ActiveLayerInfo';
import Collection from '@arcgis/core/core/Collection';
import { ArcContext } from '../../../context/ArcProvider';
import { Popup } from 'semantic-ui-react';
import './layerViewStyle.css';

import infoIcon from '../../../assets/icons/general-icons/Info.png';

// interface Props {}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const LayerLegend = (props: any) => {
  const [item, setItem] = React.useState({ active: false, element: <div></div> });

  const {
    state: { legendVM },
  } = React.useContext(ArcContext);

  const displayNoLegend = () => {
    setItem({
      active: false,
      element: (
        <div>
          <i>Layer must be visible to display legend.</i>
        </div>
      ),
    });
  };

  const tryToLoadLegend = () => {
    if (legendVM || props.visible === false) {
      const activeLayerInfo: Collection<ActiveLayerInfo> | undefined = legendVM?.activeLayerInfos.filter(activeLayerInfo => {
        return activeLayerInfo.title === props.activeLayerInfoTitle;
      });

      if (activeLayerInfo?.getItemAt(0)) {
        sleep(500).then(() => {
          const legendItems = activeLayerInfo.getItemAt(0).legendElements[0].infos;
          if (item.active === false) {
            let newItem: JSX.Element = <></>;

            newItem = (
              <div className='tile-layer-legend-row'>
                <div className='tile-layer-legend-text'>LOW</div>
                <img src={legendItems![0].src} className='tile-layer-legend-image' />
                <div className='tile-layer-legend-text'>HIGH</div>
                {props.popupContent && (
                  <div className='tile-layer-legend-popup'>
                    <Popup
                      trigger={<img src={infoIcon} width={16} height={16} />}
                      content={props.popupContent ? props.popupContent : 'Under Construction'}
                      position='right center'
                    />
                  </div>
                )}
              </div>
            );

            setItem({
              active: true,
              element: newItem,
            });
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

  return <div className='tile-layer-legend-row-parent'>{item.element}</div>;
};

export default LayerLegend;
