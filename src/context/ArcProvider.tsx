import React from 'react';
import axios from 'axios';
import createCtx from '../utils/createCtx';
import arc from './reducers/arc';
import arcInititialState from './initialstates/arcInititialState';

import IdentityManager from '@arcgis/core/identity/IdentityManager';

const [ctx, Provider] = createCtx(arc, arcInititialState);
export const ArcContext = ctx;

export const ArcProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchArcToken = async () => {
    const arcTimeout: number = +process.env.REACT_APP_ARC_CLIENT_ID!;
    const timeoutSafety = 360;
    const currentTimeInSeconds = Date.now() / 1000;
    if (
      !localStorage.arcToken ||
      !localStorage.arcTokenTime ||
      localStorage.arcTokenTime + (arcTimeout - timeoutSafety) < currentTimeInSeconds
    ) {
      const requestParams = {
        client_id: process.env.REACT_APP_ARC_CLIENT_ID,
        client_secret: process.env.REACT_APP_ARC_CLIENT_SECRET,
        grant_type: 'client_credentials',
        expiration: process.env.REACT_APP_ARC_CLIENT_ID,
      };
      // get request
      const resp = await axios.get('https://www.arcgis.com/sharing/rest/oauth2/token/', { params: requestParams });

      if (resp && resp.data.access_token) {
        localStorage.arcToken = resp.data.access_token;
      }
      if (resp && resp.data.expires_in) {
        localStorage.arcTokenTime = resp.data.expires_in;
      }
    }
  };

  React.useEffect(() => {
    async function arcLogin() {
      await fetchArcToken();
      if (localStorage.arcToken) {
        const arcToken = localStorage.arcToken;
        IdentityManager.registerToken({
          server: 'https://www.arcgis.com/sharing/rest',
          token: arcToken,
        });
      } else {
        console.error('Error no arc token found. App cannot load ArcGIS resources.');
      }
    }

    arcLogin();
  }, []);

  return <Provider>{children}</Provider>;
};
