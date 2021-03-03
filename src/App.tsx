import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { GlobalProvider } from './context/Provider';

function App() {
  return (
    <div className='App'>
      <GlobalProvider>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact render={props => <route.component {...props} />}></Route>
            ))}
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
