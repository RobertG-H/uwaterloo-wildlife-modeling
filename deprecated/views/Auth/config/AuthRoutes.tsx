import React from 'react';
import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from '../components';
import { AuthContext } from '../../../../AuthProvider';
import { Loader, Dimmer } from 'semantic-ui-react';

export const AuthRoutes = () => {
  const { loadingAuthState, authenticated } = useContext(AuthContext);

  if (loadingAuthState) {
    return (
      <Dimmer active>
        <Loader active inline></Loader>
      </Dimmer>
    );
  }

  if (authenticated) {
    return <Redirect to='/dashboard' from='/auth' />;
  }

  return (
    <Switch>
      <Route path='/auth/login' component={Login} />
      <Redirect to='/auth/login' from='/auth' />
    </Switch>
  );
};
