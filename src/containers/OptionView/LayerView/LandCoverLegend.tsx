import React from 'react';
import { ArcContext } from '../../../context/ArcProvider';

// interface Props {}

const LandCoverLegend = (props: any) => {
  const {
    state: { legendVM },
  } = React.useContext(ArcContext);

  React.useEffect(() => {
    console.log(legendVM);
  }, [legendVM]);

  return <div>Legend</div>;
};

export default LandCoverLegend;
