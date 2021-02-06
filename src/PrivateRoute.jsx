import React from 'react';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import PropTypes from 'prop-types';
import { OutputProvider } from './OutputProvider';
import { Container } from 'semantic-ui-react';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { authenticated, loadingAuthState } = useContext(AuthContext);

  if (loadingAuthState) {
    return (
      <Container>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Route
      {...rest}
      render={routeProps =>
        authenticated ? (
          <OutputProvider>
            <RouteComponent {...routeProps} />
          </OutputProvider>
        ) : (
          <Redirect to={{ pathname: '/auth', state: { prevPath: rest.path } }} />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateRoute;
