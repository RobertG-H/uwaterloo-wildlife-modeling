import React from 'react';
import EditMapItem from './EditMapItem';
import EditMapContainer from './EditMapContainer';
import { Button, Icon } from 'semantic-ui-react';
import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

import './editMapsStyle.css';

interface Props {
  onCreateNewMap(): void;
}

const EditMapsContainer = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingMap, setEditingMap] = React.useState<HotspotMap | null>(null);

  const {
    state: { hotspotMaps },
    dispatch,
  } = React.useContext(HotspotsMapsContext);

  const onEditMap = (hotspotMapId: string) => {
    const newHotSpotMap = JSON.parse(JSON.stringify(hotspotMaps[hotspotMapId])) as HotspotMap;
    setEditingMap(newHotSpotMap);
    setIsEditing(true);
  };

  const onCreateNewMap = () => {
    props.onCreateNewMap();
  };

  const generateRows = () => {
    const rows: JSX.Element[] = [];
    for (const hotspotMapId in hotspotMaps) {
      rows.push(
        <EditMapItem
          title={hotspotMaps[hotspotMapId].outputName}
          onEdit={(hotspotMapId: string) => onEditMap(hotspotMapId)}
          hotspotMapId={hotspotMapId}
        />,
      );
    }
    return rows;
  };

  return (
    <div className='edit-maps-container flex-parent flex-item'>
      {isEditing && <EditMapContainer hotspotMap={editingMap} />}
      {!isEditing && (
        <>
          {generateRows()}
          <div className='edit-maps-button'>
            <Button secondary onClick={onCreateNewMap}>
              Create New Map
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditMapsContainer;
