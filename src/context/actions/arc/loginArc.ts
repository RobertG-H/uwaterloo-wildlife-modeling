import { ARC_LOGIN_SUCCESS, ARC_LOGIN_ERROR, ARC_LOGIN_LOADING } from '../../../constants/actionTypes';
import axios from 'axios';
import IdentityManager from '@arcgis/core/identity/IdentityManager';

const fetchArcToken = async () => {
  const arcTimeout: number = +process.env.REACT_APP_ARC_TIMEOUT!;
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
      expiration: process.env.REACT_APP_ARC_TIMEOUT,
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

async function arcLogin(dispatch: React.Dispatch<any>) {
  await fetchArcToken();
  if (localStorage.arcToken) {
    const arcToken = localStorage.arcToken;
    IdentityManager.registerToken({
      server: 'https://www.arcgis.com/sharing/',
      token: arcToken,
    });
    dispatch({
      type: ARC_LOGIN_SUCCESS,
    });
  } else {
    console.error('Error no arc token found. App cannot load ArcGIS resources.');
    dispatch({
      type: ARC_LOGIN_ERROR,
    });
  }
}

export default () => (dispatch: React.Dispatch<any>) => {
  dispatch({
    type: ARC_LOGIN_LOADING,
  });
  arcLogin(dispatch);
};
