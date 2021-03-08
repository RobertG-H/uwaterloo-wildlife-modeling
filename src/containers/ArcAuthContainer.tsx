import React from 'react';
import axios from 'axios';
import { ArcContext } from '../context/ArcProvider';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import loginArc from '../context/actions/arc/loginArc';

const ArcAuthContainer = ({ children }: { children: React.ReactNode }) => {
  const { state, dispatch } = React.useContext(ArcContext);

  React.useEffect(() => {
    loginArc()(dispatch);
  }, []);
  return <div>{children}</div>;
};

export default ArcAuthContainer;
