import React from 'react';
import EditMapItem from './EditMapItem';
import EditMapContainer from './EditMapContainer';
import { Button } from 'semantic-ui-react';
import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
// import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

import './editMapsStyle.css';

interface Props {
  onCreateNewMap(): void;
}

const EditMapsContainer = (props: Props) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const {
    state: { hotspotMaps },
    dispatch,
  } = React.useContext(HotspotsMapsContext);

  const onEditMap = () => {
    setIsEditing(true);
  };

  const onCreateNewMap = () => {
    props.onCreateNewMap();
  };

  const generateRows = () => {
    const rows: JSX.Element[] = [];
    for (const hotspotMap in hotspotMaps) {
      rows.push(<EditMapItem title={hotspotMaps[hotspotMap].outputName} onEdit={onEditMap} />);
    }
    return rows;
  };

  return (
    <div className='edit-maps-container'>
      {isEditing && <EditMapContainer />}
      {!isEditing && (
        <>
          {generateRows()}
          <Button onClick={onCreateNewMap}> Create New Map</Button>
        </>
      )}
    </div>
  );
};

export default EditMapsContainer;
