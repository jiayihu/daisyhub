import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from './components/404/NotFound';
import { Homepage } from './components/Homepage/Homepage';
import { Host } from './components/Host/Host';
import { Join } from './components/Join/Join';
import { NavigationItems } from './components/NavigationItems/NavigationItems';

function App() {
  const routes = (
    <Switch>
      <Route path="/host" component={Host} />
      <Route path="/join" component={Join} />
      <Route exact path="/" component={Homepage} />
      <Route path="*" component={NotFound} />
    </Switch>
  );

  return (
    <div>
      <NavigationItems />
      {routes}
    </div>
  );
}

export default App;
