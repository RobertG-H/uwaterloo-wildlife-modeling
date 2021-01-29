import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import Credential from '@arcgis/core/identity/Credential';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import Portal from '@arcgis/core/portal/Portal';

type ContextProps = {
  user: string | null;
  authenticated: boolean;
  setUser: any;
  loadingAuthState: boolean;
  setLoadingAuthState: any;
  tryToSignIn: any;
  logout: any;
};

export const AuthContext = React.createContext<Partial<ContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const adminAccount = 'RobertGH'; // TODO update to better check
  const [user, setUser] = useState(null as string | null);

  // Used to track when making auth requests and frontend should wait
  // Components can setLoadingAuthState to true when they make an auth request
  //      and they are waiting for the AuthContext to update.
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  // Auth tut: https://developers.arcgis.com/javascript/latest/sample-code/identity-oauth-basic/index.html

  const info = new OAuthInfo({
    appId: process.env.REACT_APP_ARC_CLIENT_ID,
    popup: false,
  });

  IdentityManager.registerOAuthInfos([info]);

  // Checks signin
  IdentityManager.checkSignInStatus(info.portalUrl + '/sharing')
    .then((cred: Credential) => {
      console.log('Checking signin status');
      if (cred.userId !== adminAccount) {
        console.log('Auth failed, incorrect account');
        logout();
      }

      const portal = new Portal();
      // Setting authMode to immediate signs the user in once loaded
      portal.authMode = 'immediate';
      // Once loaded, user is signed in
      portal.load().then(function () {
        setUser(cred.userId);
        setLoadingAuthState(false);
        console.log(user);
      });
    })
    .catch(() => {
      console.log('not auth');
      setLoadingAuthState(false);
    });

  const tryToSignIn = () => {
    setLoadingAuthState(true);
    IdentityManager.getCredential(info.portalUrl + '/sharing');
  };

  const logout = () => {
    setUser(null);
    setLoadingAuthState(false);
    IdentityManager.destroyCredentials();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
        setLoadingAuthState,
        tryToSignIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
