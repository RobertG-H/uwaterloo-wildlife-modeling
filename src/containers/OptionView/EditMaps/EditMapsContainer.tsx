import React from 'react';
import EditMapItem from './EditMapItem';
import { Button } from 'semantic-ui-react';
import { HotspotsMapsContext } from '../../../context/HotspotsMapsProvider';
// import { HotspotMap } from '../../../context/initialstates/hotspotMapsInitialState';

import './editMapsStyle.css';

interface Props {
  onCreateNewMap(): void;
}

const EditMapsContainer = (props: Props) => {
  const {
    state: { hotspotMaps },
    dispatch,
  } = React.useContext(HotspotsMapsContext);

  const onCreateNewMap = () => {
    props.onCreateNewMap();
  };

  const generateRows = () => {
    const rows: JSX.Element[] = [];
    for (const hotspotMap in hotspotMaps) {
      rows.push(<EditMapItem title={hotspotMaps[hotspotMap].outputName} />);
    }
    return rows;
  };

  return (
    <div className='edit-maps-container'>
      {generateRows()}
      <Button onClick={onCreateNewMap}> Create New Map</Button>
    </div>
  );
};

export default EditMapsContainer;
