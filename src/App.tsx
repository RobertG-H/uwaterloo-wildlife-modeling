import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import routes from './routes';
import { routeTypes } from './routes';
import { AuthProvider } from './context/AuthProvider';
import isAuthenticated from './utils/isAuthenticated';

const RenderRoute = (route: routeTypes) => {
  const history = useHistory();

  document.title = route.title || 'Wildlife Hotspots';
  if (route.needsAuth && !isAuthenticated()) {
    history.push('/auth/login');
  }
  return <Route path={route.path} exact render={props => <route.component {...props} />}></Route>;
};

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <React.Suspense fallback={<p>Loading</p>}>
            <Switch>
              {routes.map((route, index) => (
                <RenderRoute {...route} key={index} />
              ))}
            </Switch>
          </React.Suspense>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
